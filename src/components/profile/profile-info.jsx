// src/components/profile/ProfileInfo.jsx

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';

function formatPhone(phone) {
  if (!phone) return '-';

  const digits = phone.replace(/\D/g, '');

  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  return phone;
}

export default function ProfileInfo({ data }) {
  const { userName, userEmail, userPhone, userNickname, userRole, createdAt } = data;

  const showRole = userRole === 'SELLER' || userRole === 'ADMIN';

  return (
    <Card className='mx-auto w-full max-w-3xl'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>내 프로필</CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <InfoRow
          label='이름'
          value={userName}
        />
        <Separator />

        <InfoRow
          label='이메일'
          value={userEmail}
        />
        <Separator />

        <InfoRow
          label='연락처'
          value={formatPhone(userPhone)}
        />
        <Separator />

        <InfoRow
          label='닉네임'
          value={userNickname}
        />
        <Separator />

        {showRole && (
          <>
            <div className='flex items-center justify-between'>
              <span className='font-semibold'>권한</span>
              <Badge variant='secondary'>{userRole}</Badge>
            </div>
            <Separator />
          </>
        )}

        <InfoRow
          label='가입일'
          value={createdAt?.slice(0, 10)}
        />

        <Button
          asChild
          variant='outline'
          className='mt-5 w-full'
          size='sm'
        >
          <Link to='/mypage/editProfile'>프로필 수정</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className='flex items-center justify-between py-3'>
      <span className='font-semibold'>{label}</span>
      <span>{value || '-'}</span>
    </div>
  );
}
