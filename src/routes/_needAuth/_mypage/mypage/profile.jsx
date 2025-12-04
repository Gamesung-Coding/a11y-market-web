import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { userApi } from '@/api/user-api';
import ProfileInfo from '@/components/profile/profile-info';
import { Card, CardContent } from '@/components/ui/card';

export const Route = createFileRoute('/_needAuth/_mypage/mypage/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi
      .getProfile()
      .then((res) => setProfile(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card className='mx-auto mt-6 w-full max-w-xl'>
        <CardContent className='p-6'>불러오는 중...</CardContent>
      </Card>
    );
  }

  return (
    <div className='p-4'>
      <ProfileInfo data={profile} />
    </div>
  );
}
