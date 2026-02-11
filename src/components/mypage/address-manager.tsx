import { useDeleteAddress } from '@/api/address/mutations';
import { useGetAddressList } from '@/api/address/queries';
import type { Address } from '@/api/address/types';
import AddressList from '@/components/address/address-list';
import DefaultAddress from '@/components/address/default-address';
import { NewAddressForm } from '@/components/address/new-address-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { toast } from 'sonner';

export const AddressManager = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { data: addresses } = useGetAddressList();
  const { mutateAsync: deleteAddress } = useDeleteAddress();

  const handleEdit = (addr: Address) => setEditingAddress(addr);

  const handleDelete = async (addressId: string) => {
    await deleteAddress(addressId);
    toast.success('배송지가 삭제되었습니다.');
  };

  const defaultAddr = addresses?.find((a) => a.isDefault) || null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>배송지 관리</CardTitle>
        <CardDescription className='text-lg'>배송지를 등록/관리 할 수 있습니다.</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs
          defaultValue='default'
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v);
            setEditingAddress(null);
          }}
          className='w-full'
        >
          <TabsList className='mb-0 grid h-12 w-full grid-cols-3'>
            <TabsTrigger value='default'>기본배송지</TabsTrigger>
            <TabsTrigger value='new'>신규배송지</TabsTrigger>
            <TabsTrigger value='list'>배송지목록</TabsTrigger>
          </TabsList>

          {/* 기본배송지 */}
          <TabsContent value='default'>
            {editingAddress?.addressId === defaultAddr?.addressId ? (
              <NewAddressForm
                mode='edit'
                initialForm={editingAddress}
                isDefault={true}
                onCancel={() => setEditingAddress(null)}
              />
            ) : (
              <DefaultAddress
                defaultAddress={defaultAddr}
                onEdit={handleEdit}
              />
            )}
          </TabsContent>

          {/* 신규배송지 */}
          <TabsContent value='new'>
            <NewAddressForm mode='add' />
          </TabsContent>

          {/* 배송지 목록 */}
          <TabsContent value='list'>
            {editingAddress ? (
              <NewAddressForm
                mode='edit'
                initialForm={editingAddress}
                onCancel={() => setEditingAddress(null)}
              />
            ) : (
              <AddressList
                addresses={addresses || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
