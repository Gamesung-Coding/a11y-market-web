import { createFileRoute } from '@tanstack/react-router';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';

import { useUpdateUserRole } from '@/api/admin/mutations';
import { useUsers } from '@/api/admin/queries';
import type { User } from '@/api/user/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Route = createFileRoute('/_need-auth/_admin/admin/users')({
  component: RouteComponent,
});

/** 선택 가능한 권한 옵션 */
const ROLE_OPTIONS = [
  { value: 'USER', label: '일반 회원' },
  { value: 'SELLER', label: '판매자' },
  { value: 'ADMIN', label: '관리자' },
];

function RouteComponent() {
  const { data: users = [] } = useUsers();
  const { mutateAsync: updateUserRole } = useUpdateUserRole();

  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  // userId → 변경 예정 role
  const [roleDrafts, setRoleDrafts] = useState<Record<string, string>>({});

  /** 행 열고 닫기 */
  const toggleRow = (id: string) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));
  };

  /**  헬퍼 컴포넌트 */
  const InfoRow = ({ label, value }: { label: string; value: string | number | undefined }) => (
    <div className='flex justify-between gap-2'>
      <span className='font-kakao-little text-[11px] text-neutral-500 dark:text-neutral-400'>
        {label}
      </span>
      <span className='font-kakao-little text-[11px] text-neutral-800 dark:text-neutral-100'>
        {value}
      </span>
    </div>
  );

  /** 셀렉트 박스에서 권한 바꿀 때 임시 값 저장 */
  const handleRoleSelectChange = (userId: string, nextRole: string) => {
    setRoleDrafts((prev) => ({
      ...prev,
      [userId]: nextRole,
    }));
  };

  /** "권한 변경" 버튼 눌렀을 때 */
  const handleApplyRoleChange = async (user: User) => {
    const draftRole = roleDrafts[user.userId];

    // 변경할 값이 없으면 그냥 리턴
    if (!draftRole || draftRole === user.userRole) {
      toast.info('변경된 권한이 없습니다.');
      return;
    }

    try {
      await updateUserRole({
        userId: user.userId,
        role: draftRole,
      });

      toast.success('회원 권한이 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('회원 권한 변경에 실패했습니다.', error);
      toast.error('회원 권한 변경에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6'>
      {/* 페이지 헤더 */}
      <header className='text-center'>
        <h1 className='font-kakao-big mb-2 bg-neutral-50 text-3xl font-semibold dark:bg-neutral-900'>
          회원 관리
        </h1>
        <p className='font-kakao-little bg-neutral-50 text-sm dark:bg-neutral-900'>
          등록된 구매자와 판매자의 정보를 조회하고 권한을 관리할 수 있습니다.
        </p>
      </header>

      {/* 회원 목록 테이블 카드 */}
      <Card className='border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900'>
        <CardHeader className='border-b border-neutral-100 pb-3 dark:border-neutral-800'>
          <CardTitle className='font-kakao-little text-sm text-neutral-900 dark:text-neutral-50'>
            회원 목록
          </CardTitle>
          <CardDescription className='font-kakao-little text-xs text-neutral-500 dark:text-neutral-400'>
            행을 클릭하면 상세 정보와 권한 변경 옵션을 확인할 수 있습니다.
          </CardDescription>
        </CardHeader>

        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='font-kakao-little text-center text-xs font-normal text-neutral-700 dark:text-neutral-300'>
                  이름
                </TableHead>
                <TableHead className='font-kakao-little text-center text-xs font-normal text-neutral-700 dark:text-neutral-300'>
                  이메일
                </TableHead>
                <TableHead className='font-kakao-little text-center text-xs font-normal text-neutral-700 dark:text-neutral-300'>
                  닉네임
                </TableHead>
                <TableHead className='font-kakao-little text-center text-xs font-normal text-neutral-700 dark:text-neutral-300'>
                  회원구분
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => {
                const isExpanded = expandedRows.includes(user.userEmail);
                const currentDraftRole = roleDrafts[user.userId] ?? user.userRole;

                return (
                  <Fragment key={user.userEmail}>
                    {/* 메인 행 */}
                    <TableRow
                      className='cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                      onClick={() => toggleRow(user.userEmail)}
                    >
                      <TableCell className='font-kakao-little text-center text-xs text-neutral-800 dark:text-neutral-100'>
                        {user.userName}
                      </TableCell>
                      <TableCell className='font-kakao-little text-center text-xs text-neutral-800 dark:text-neutral-100'>
                        {user.userEmail}
                      </TableCell>
                      <TableCell className='font-kakao-little text-center text-xs text-neutral-800 dark:text-neutral-100'>
                        {user.userNickname}
                      </TableCell>
                      <TableCell className='font-kakao-little text-center text-xs text-neutral-800 dark:text-neutral-100'>
                        {user.userRole}
                      </TableCell>
                    </TableRow>

                    {/* 확장 상세 행 */}
                    {isExpanded && (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className='bg-neutral-50 p-4 dark:bg-neutral-900/40'
                        >
                          <Card
                            id={`user-details-${user.userEmail}`}
                            role='region'
                            className='border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'
                          >
                            <CardHeader className='pb-3'>
                              <CardTitle className='font-kakao-little text-sm text-neutral-900 dark:text-neutral-50'>
                                회원 상세 정보
                              </CardTitle>
                              <CardDescription className='font-kakao-little text-xs text-neutral-500 dark:text-neutral-400'>
                                선택한 회원의 기본 정보와 권한을 확인하고 변경할 수 있습니다.
                              </CardDescription>
                            </CardHeader>

                            <CardContent className='space-y-4'>
                              {/* 기본 정보 */}
                              <div className='grid gap-2 text-xs text-neutral-800 sm:grid-cols-2 dark:text-neutral-100'>
                                <InfoRow
                                  label='이름'
                                  value={user.userName}
                                />
                                <InfoRow
                                  label='이메일'
                                  value={user.userEmail}
                                />
                                <InfoRow
                                  label='닉네임'
                                  value={user.userNickname}
                                />
                                <InfoRow
                                  label='회원 구분'
                                  value={user.userRole}
                                />
                                <InfoRow
                                  label='가입일'
                                  value={new Date(user.createdAt).toLocaleString()}
                                />
                                <InfoRow
                                  label='최근 수정일'
                                  value={new Date(user.updatedAt).toLocaleString()}
                                />
                              </div>

                              {/* 권한 관리 영역 */}
                              <Card className='border border-neutral-200 bg-neutral-50/60 dark:border-neutral-700 dark:bg-neutral-900/40'>
                                <CardHeader className='pb-2'>
                                  <CardTitle className='font-kakao-little text-xs font-semibold text-neutral-900 dark:text-neutral-50'>
                                    권한 변경
                                  </CardTitle>
                                  <CardDescription className='font-kakao-little text-[11px] text-neutral-500 dark:text-neutral-400'>
                                    변경할 권한을 선택한 후 &quot;권한 변경&quot; 버튼을 눌러주세요.
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-2'>
                                  <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
                                    <span className='font-kakao-little text-[11px] text-neutral-600 dark:text-neutral-300'>
                                      변경할 권한 선택
                                    </span>

                                    <Select
                                      value={currentDraftRole}
                                      onValueChange={(value) =>
                                        handleRoleSelectChange(user.userId, value)
                                      }
                                    >
                                      <SelectTrigger className='h-8 w-40 text-xs'>
                                        <SelectValue placeholder='권한 선택' />
                                      </SelectTrigger>

                                      <SelectContent>
                                        {ROLE_OPTIONS.map((role) => (
                                          <SelectItem
                                            key={role.value}
                                            value={role.value}
                                            className='text-xs'
                                          >
                                            {role.label} ({role.value})
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>

                                    <Button
                                      type='button'
                                      size='sm'
                                      className='font-kakao-little h-8 px-3 text-xs'
                                      onClick={() => handleApplyRoleChange(user)}
                                      disabled={currentDraftRole === user.userRole}
                                    >
                                      권한 변경
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </CardContent>
                          </Card>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default RouteComponent;
