import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const EMPTY_FORM = {
  id: undefined,
  addressName: '',
  receiverName: '',
  zipcord: '',
  address1: '',
  address2: '',
  phone: '',
  isDefault: false,
};

export default function NewAddressForm({ initialForm = null, onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (initialForm) {
      setForm((prev) => ({ ...prev, ...initialForm }));
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialForm]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!form.addressName || !form.receiverName || !form.zipcord || !form.address1) {
      alert('배송지명, 수령인, 우편번호(또는 우편코드), 주소(주소1)는 필수입니다.');
      return;
    }
    onSave && onSave(form);
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    onCancel && onCancel();
  };

  return (
    <form
      className='space-y-5'
      onSubmit={handleSubmit}
    >
      <div>
        <label className='mb-1 block'>배송지명</label>
        <div className='flex items-center gap-2'>
          <input
            type='text'
            name='addressName'
            value={form.addressName}
            onChange={handleChange}
            placeholder='예: 우리집, 회사 등'
            className='w-64 rounded-md border border-gray-300 p-2'
          />
          <label className='flex cursor-pointer items-center gap-1'>
            <input
              type='checkbox'
              name='isDefault'
              checked={!!form.isDefault}
              onChange={handleChange}
            />
            기본배송지로 설정
          </label>
        </div>
      </div>

      <div>
        <label className='mb-1 block'>수령인</label>
        <input
          type='text'
          name='receiverName'
          value={form.receiverName}
          onChange={handleChange}
          placeholder='수령인 이름'
          className='w-72 rounded-md border border-gray-300 p-2'
        />
      </div>

      <div>
        <label className='mb-1 block'>연락처</label>
        <input
          type='text'
          name='phone'
          value={form.phone}
          onChange={handleChange}
          placeholder='01012345678'
          className='w-72 rounded-md border border-gray-300 p-2'
        />
      </div>

      <div>
        <label className='mb-1 block'>우편번호(Zipcord)</label>
        <input
          type='text'
          name='zipcord'
          value={form.zipcord}
          onChange={handleChange}
          placeholder='예: 12345'
          className='w-48 rounded-md border border-gray-300 p-2'
        />
      </div>

      <div>
        <label className='mb-1 block'>주소1</label>
        <input
          type='text'
          name='address1'
          value={form.address1}
          onChange={handleChange}
          placeholder='도로명/지번'
          className='w-full rounded-md border border-gray-300 p-2'
        />
      </div>

      <div>
        <label className='mb-1 block'>주소2 (상세주소)</label>
        <input
          type='text'
          name='address2'
          value={form.address2}
          onChange={handleChange}
          placeholder='상세주소 예: 101동 1001호'
          className='w-full rounded-md border border-gray-300 p-2'
        />
      </div>

      <div className='flex justify-center gap-2'>
        <Button type='submit'>{form.id ? '수정 저장' : '저장하기'}</Button>
        <Button
          type='button'
          onClick={handleReset}
          className='border border-black bg-white text-black hover:bg-gray-100'
        >
          초기화/취소
        </Button>
      </div>
    </form>
  );
}
