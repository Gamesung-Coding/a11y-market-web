import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_auth/join/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('naver.com');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    //이메일 조합
    const email = `${emailId}@${emailDomain}`;
    const birth = `${birthYear}-${birthMonth}-${birthDay}`;

    //검증
    if (!userId) return setErrorMsg('아이디를 입력하세요.');
    if (!password) return setErrorMsg('비밀번호를 입력하세요.');
    if (password.length < 8) return setErrorMsg('비밀번호는 최소 8자 이상이어야 합니다.');
    if (password !== passwordCheck) return setErrorMsg('비밀번호가 일치하지 않습니다.');
    if (!name) return setErrorMsg('이름을 입력하세요.');
    if (!/^[0-9]{11}$/.test(phone)) return setErrorMsg('전화번호는 숫자 11자리여야 합니다.');
    if (!birthYear || !birthMonth || !birthDay) return setErrorMsg('생년월일을 모두 선택하세요.');

    //정상 출력
    console.log('가입 데이터 :', {
      userId,
      password,
      name,
      phone,
      email,
      birth,
    });
  }

  return (
    <main className='font-kakao-big-sans mx-auto max-w-md px-4 py-10'>
      <h1 className='mb-6 text-xl font-bold'>회원가입</h1>
      {errorMsg && (
        <Alert variant='destructive'>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={handleSubmit}
        className='space-y-6'
      >
        {/* 아이디 */}
        <div className='space-y-2'>
          <Label className='text-sm font-semibold'>아이디</Label>
          <div className='flex gap-2'>
            <Input
              type='text'
              placeholder='아이디 입력'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className='flex-1'
            />
            <Button
              type='button'
              variant='outline'
              className='text-sm'
            >
              중복확인
            </Button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className='space-y-2'>
          <Label
            htmlFor='password'
            className='text-sm font-semibold'
          >
            비밀번호
          </Label>
          <Input
            id='password'
            type='password'
            placeholder='비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 비밀번호 확인*/}
        <div className='space-y-2'>
          <Label
            htmlFor='passwordCheck'
            className='text-sm font-semibold'
          >
            비밀번호 확인
          </Label>
          <Input
            id='passwordCheck'
            type='password'
            placeholder='비밀번호 재입력'
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>

        {/* 이름 */}
        <div className='space-y-2'>
          <Label
            htmlFor='name'
            className='text-sm font-semibold'
          >
            이름
          </Label>
          <Input
            id='name'
            type='text'
            placeholder='이름 입력'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* 전화번호 */}
        <div className='space-y-2'>
          <Label
            htmlFor='phone'
            className='text-sm font-semibold'
          >
            전화번호
          </Label>
          <Input
            id='phone'
            type='text'
            placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* 이메일 주소 */}
        <div className='space-y-2'>
          <Label className='text-sm font-semibold'>이메일 주소</Label>
          <div className='flex items-center gap-2'>
            <Input
              id='emailId'
              type='text'
              placeholder='이메일 주소'
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <span>@</span>
            <Select
              value={emailDomain}
              onValueChange={setEmailDomain}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='도메인 선택' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='naver.com'>naver.com</SelectItem>
                <SelectItem value='gmail.com'>gmail.com</SelectItem>
                <SelectItem value='daum.com'>daum.com</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 생년월일 */}
        <div className='space-y-2'>
          <Label className='text-sm font-semibold'>생년월일</Label>
          <div className='flex gap-2'>
            <Select
              value={birthYear}
              onValueChange={setBirthYear}
            >
              <SelectTrigger className='flex-1'>
                <SelectValue placeholder='년도' />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) => 2024 - i).map((year) => (
                  <SelectItem
                    key={year}
                    value={String(year)}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={birthMonth}
              onValueChange={setBirthMonth}
            >
              <SelectTrigger className='flex-1'>
                <SelectValue placeholder='월' />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <SelectItem
                    key={m}
                    value={String(m)}
                  >
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={birthDay}
              onValueChange={setBirthDay}
            >
              <SelectTrigger className='flex-1'>
                <SelectValue placeholder='일' />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <SelectItem
                    key={d}
                    value={String(d)}
                  >
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className='mt-8 space-y-3'>
          <Button
            type='submit'
            variant='default'
            className='w-full'
          >
            가입하기
          </Button>

          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={() => navigate({ to: '/auth/login' })}
          >
            가입 취소
          </Button>
        </div>
      </form>
    </main>
  );
}
