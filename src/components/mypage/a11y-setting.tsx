import { useDeleteA11yProfile, useGetA11yProfiles } from '@/api/a11y/queries';
import type { UserA11yProfile } from '@/api/a11y/types';
import A11yEditModal from '@/components/accessibility/a11y-edit-modal';
import A11yProfileList from '@/components/accessibility/a11y-profile-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useA11yActions } from '@/store/a11y-store';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoadingEmpty } from '../main/loading-empty';

export const A11ySetting = () => {
  const { saveA11ySettings } = useA11yActions();
  const { data: profiles, isLoading } = useGetA11yProfiles();
  const { mutateAsync: deleteProfile } = useDeleteA11yProfile();
  const [editingProfile, setEditingProfile] = useState<UserA11yProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 적용하기
  const handleApply = (p: UserA11yProfile) => {
    saveA11ySettings({
      contrastLevel: p.contrastLevel,
      textSizeLevel: p.textSizeLevel,
      textSpacingLevel: p.textSpacingLevel,
      lineHeightLevel: p.lineHeightLevel,
      textAlign: p.textAlign,
      screenReader: p.screenReader,
      smartContrast: p.smartContrast,
      highlightLinks: p.highlightLinks,
      cursorHighlight: p.cursorHighlight,
    });
    toast.success(`"${p.profileName}" 프로필이 적용되었습니다.`);
  };

  // 새 프로필 생성
  const handleCreate = () => {
    setEditingProfile(null);
    setModalOpen(true);
  };

  // 수정
  const handleEdit = (p: UserA11yProfile) => {
    saveA11ySettings({
      contrastLevel: p.contrastLevel,
      textSizeLevel: p.textSizeLevel,
      textSpacingLevel: p.textSpacingLevel,
      lineHeightLevel: p.lineHeightLevel,
      textAlign: p.textAlign,
      screenReader: p.screenReader,
      smartContrast: p.smartContrast,
      highlightLinks: p.highlightLinks,
      cursorHighlight: p.cursorHighlight,
    });
    setEditingProfile(p);
    setModalOpen(true);
  };

  // 삭제
  const handleDelete = async (id: string) => {
    if (!window.confirm('프로필을 삭제할까요?')) return;

    await deleteProfile(id);
    toast.success('삭제되었습니다.');
  };

  if (isLoading) return <LoadingEmpty />;
  if (!profiles || profiles?.length === 0) return <LoadingEmpty />;

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>접근성 프로필 관리</CardTitle>
          <CardDescription className='text-gray-600'>
            저장된 접근성 설정 프로필을 선택하거나 새로 만들 수 있습니다.
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-6 p-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg'>저장된 프로필</h2>
            <Button onClick={handleCreate}>새 프로필 추가</Button>
          </div>

          <A11yProfileList
            profiles={profiles}
            onApply={handleApply}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <A11yEditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialProfile={editingProfile}
      />
    </div>
  );
};
