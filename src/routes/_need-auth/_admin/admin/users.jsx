// src/routes/_need-auth/_admin/admin/users.jsx
import { createFileRoute } from '@tanstack/react-router';
import { Fragment, useEffect, useState } from 'react';

import { adminApi } from '@/api/admin-api';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
  const [users, setUsers] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  // userId → 변경 예정 role
  const [roleDrafts, setRoleDrafts] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await adminApi.getUsers();
        // console.log('getUsers 응답', response.data);
        setUsers(response.data);
      } catch (err) {
        console.error('회원 목록 정보를 불러오는데 실패했습니다.', err);
      }
    }

    fetchUsers();
  }, []);

  /** 셀렉트 박스에서 권한 바꿀 때 임시 값 저장 */
  const handleRoleSelectChange = (userId, nextRole) => {
    setRoleDrafts((prev) => ({
      ...prev,
      [userId]: nextRole,
    }));
  };

  /** "권한 변경" 버튼 눌렀을 때 */
  const handleApplyRoleChange = async (user) => {
    const draftRole = roleDrafts[user.userId];

    // 변경할 값이 없으면 그냥 리턴
    if (!draftRole || draftRole === user.userRole) return;

    try {
      const res = await adminApi.updateUserRole({
        userId: user.userId,
        role: draftRole,
      });

      const updatedUser = res.data;

      setUsers((prev) =>
        prev.map((u) =>
          u.userId === user.userId
            ? {
                ...u,
                userRole: updatedUser.userRole ?? draftRole,
                updatedAt: updatedUser.updatedAt ?? new Date().toISOString(),
              }
            : u,
        ),
      );
    } catch (error) {
      console.error('회원 권한 변경에 실패했습니다.', error);
    }
  };

  return (
    <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6'>
      {/* 페이지 헤더 */}
      <header className='text-center'>
        <h1 className='font-kakao-big mb-2 text-3xl font-semibold text-slate-900'>회원 관리</h1>
        <p className='font-kakao-little text-sm text-slate-500'>
          등록된 구매자와 판매자의 정보를 조회하고 권한을 관리할 수 있습니다.
        </p>
      </header>

      {/* 회원 목록 테이블 카드 */}
      <Card className='border-slate-200 bg-white shadow-sm'>
        <CardHeader className='border-b border-slate-100 pb-3'>
          <CardTitle className='font-kakao-little text-sm text-slate-900'>회원 목록</CardTitle>
          <CardDescription className='font-kakao-little text-xs text-slate-500'>
            행을 클릭하면 상세 정보와 권한 변경 옵션을 확인할 수 있습니다.
          </CardDescription>
        </CardHeader>

        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='font-kakao-little text-center text-xs font-semibold text-slate-700'>
                  이름
                </TableHead>
                <TableHead className='font-kakao-little text-center text-xs font-semibold text-slate-700'>
                  이메일
                </TableHead>
                <TableHead className='font-kakao-little text-center text-xs font-semibold text-slate-700'>
                  닉네임
                </TableHead>
                <TableHead className='font-kakao-little text-center text-xs font-semibold text-slate-700'>
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
                      className='cursor-pointer hover:bg-slate-50'
                      onClick={() => toggleRow(user.userEmail)}
                    >
                      <TableCell className='font-kakao-little text-center text-xs text-slate-800'>
                        {user.userName}
                      </TableCell>
                      <TableCell className='font-kakao-little text-center text-xs text-slate-800'>
                        {user.userEmail}
                      </TableCell>
                      <TableCell className='font-kakao-little text-center text-xs text-slate-800'>
                        {user.userNickname}
                      </TableCell>
                      <TableCell className='font-kakao-little text-center text-xs text-slate-800'>
                        {user.userRole}
                      </TableCell>
                    </TableRow>

                    {/* 확장 상세 행 */}
                    {isExpanded && (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className='bg-slate-50 p-4'
                        >
                          <Card
                            id={`user-details-${user.userEmail}`}
                            role='region'
                            className='border-slate-200 bg-white'
                          >
                            <CardHeader className='pb-3'>
                              <CardTitle className='font-kakao-little text-sm text-slate-900'>
                                회원 상세 정보
                              </CardTitle>
                              <CardDescription className='font-kakao-little text-xs text-slate-500'>
                                선택한 회원의 기본 정보와 권한을 확인하고 변경할 수 있습니다.
                              </CardDescription>
                            </CardHeader>

                            <CardContent className='space-y-4'>
                              {/* 기본 정보 */}
                              <div className='grid gap-2 text-xs text-slate-800 sm:grid-cols-2'>
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
                              <Card className='border-slate-200 bg-slate-50/60'>
                                <CardHeader className='pb-2'>
                                  <CardTitle className='font-kakao-little text-xs font-semibold text-slate-900'>
                                    권한 변경
                                  </CardTitle>
                                  <CardDescription className='font-kakao-little text-[11px] text-slate-500'>
                                    변경할 권한을 선택한 후 &quot;권한 변경&quot; 버튼을 눌러주세요.
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-2'>
                                  <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
                                    <span className='font-kakao-little text-[11px] text-slate-600'>
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

/** 정보 한 줄 */
function InfoRow({ label, value }) {
  return (
    <div className='flex justify-between gap-2'>
      <span className='font-kakao-little text-[11px] text-slate-500'>{label}</span>
      <span className='font-kakao-little text-[11px] text-slate-800'>{value}</span>
    </div>
  );
}

export default RouteComponent;
