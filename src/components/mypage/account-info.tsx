import { useUpdateProfile } from '@/api/user/mutations';
import { useGetProfile } from '@/api/user/queries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useState } from 'react';

interface AccountFormData {
  userEmail: string;
  userName: string;
  userPhone: string;
  userNickname: string;
}

export const AccountInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AccountFormData>({
    userEmail: '',
    userName: '',
    userPhone: '',
    userNickname: '',
  });

  const { data: user } = useGetProfile();
  const { mutateAsync: updateProfile } = useUpdateProfile();

  useEffect(() => {
    if (user) {
      setFormData({
        userEmail: user.userEmail || '',
        userName: user.userName || '',
        userPhone: user.userPhone || '',
        userNickname: user.userNickname || '',
      });
    }
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    await updateProfile({
      userName: formData.userName,
      userPhone: formData.userPhone,
      userNickname: formData.userNickname,
    });
    setIsEditing(false);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>회원 정보</CardTitle>
        <CardDescription>계정 정보를 관리하세요</CardDescription>
      </CardHeader>
      <CardContent className={'space-y-4'}>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='userEmail'>이메일</FieldLabel>
              <Input
                id='userEmail'
                type='email'
                value={formData.userEmail}
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='userName'>이름</FieldLabel>
              <Input
                id='userName'
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                disabled={!isEditing}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='userPhone'>전화번호</FieldLabel>
              <Input
                id='userPhone'
                value={formData.userPhone}
                onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                disabled={!isEditing}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='userNickname'>닉네임</FieldLabel>
              <Input
                id='userNickname'
                value={formData.userNickname}
                onChange={(e) => setFormData({ ...formData, userNickname: e.target.value })}
                disabled={!isEditing}
              />
            </Field>
            <Field className={'flex gap-2'}>
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : '저장'}
                  </Button>
                  <Button
                    variant='outline'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditing(false);
                    }}
                    disabled={isLoading}
                  >
                    취소
                  </Button>
                </>
              ) : (
                <Button
                  variant='default'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(true);
                  }}
                >
                  수정
                </Button>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
