import { addressApi } from '@/api/address-api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';
import { NewAddressForm } from './new-address-form';

export const AddressModifier = ({ mode, onChange, className = '', variant = 'outline' }) => {
  const [formData, setFormData] = useState({
    addressName: '',
    receiverName: '',
    receiverPhone: '',
    receiverZipcode: '',
    receiverAddr1: '',
    receiverAddr2: '',
    isDefault: false,
  });

  const [isModifierDialogOpen, setIsModifierDialogOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  const transparentScrollbarStyle =
    '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-400 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-transparent';

  const formatPhoneNumber = (value) => {
    if (!value) return '';
    const input = value.replace(/[^0-9]/g, '');
    setFormData((prev) => ({ ...prev, receiverPhone: input }));
    if (input.length <= 3) {
      return input;
    } else if (input.length <= 7) {
      return `${input.slice(0, 3)}-${input.slice(3)}`;
    } else if (input.length <= 10) {
      return `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6)}`;
    } else {
      return `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`;
    }
  };

  const handleOnComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setFormData((prev) => ({
      ...prev,
      receiverZipcode: data.zonecode,
      receiverAddr1: fullAddress,
    }));
    setIsAddressDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let resp;
      if (mode === 'add') {
        resp = await addressApi.createAddress(formData);
      } else {
        resp = await addressApi.updateAddress(formData);
      }

      onChange();
      setIsModifierDialogOpen(false);
      toast.success('배송지를 저장했습니다.');
    } catch (err) {
      console.error('배송지 저장 실패:', err);
      toast.error(err.message || '배송지 저장에 실패했습니다.');
    }
  };

  return (
    <Dialog
      open={isModifierDialogOpen}
      onOpenChange={setIsModifierDialogOpen}
    >
      <form>
        <DialogTrigger asChild>
          <Button
            className={cn(
              'w-full transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-md',
              className,
            )}
            variant={variant}
          >
            {mode === 'add' ? '배송지 추가' : '배송지 수정'}
          </Button>
        </DialogTrigger>
        <DialogContent className='px-0 pt-2'>
          <NewAddressForm />
        </DialogContent>
      </form>
    </Dialog>
  );
};
