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
import { authApi } from '@/api/auth-api';

export const Route = createFileRoute('/_auth/join/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('naver.com');
  const [customDomain, setCustomDomain] = useState('');

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({});

  const isValidDomain = (domain) => /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);

  const getDomain = () => (emailDomain === 'custom' ? customDomain.trim() : emailDomain);

  const getFullEmail = () => {
    const domain = getDomain();
    if (!emailId.trim() || !domain) return '';
    return `${emailId.trim()}@${domain}`;
  };

  //이메일 중복확인
  async function handleEmailCheck() {
    const domain = getDomain();
    const newErrors = {};

    setErrors((prev) => ({ ...prev, email: undefined }));

    if (!emailId.trim()) {
      newErrors.email = '이메일 아이디를 입력하세요.';
    }

    // 직접입력 검증
    if (emailDomain === 'custom') {
      if (!customDomain.trim()) {
        newErrors.email = '도메인을 입력하세요. (예: gmail.com)';
      } else if (!isValidDomain(customDomain.trim())) {
        newErrors.email = '정확한 도메인명을 입력해주세요.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    const fullEmail = getFullEmail();
    if (!fullEmail) {
      window.alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    try {
      const response = await authApi.checkEmail(fullEmail);

      if (response.data === true) {
        window.alert('이미 사용 중인 이메일입니다.');
      } else {
        window.alert('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      window.alert('이메일 중복 확인 중 오류가 발생했습니다.');
    }
  }

  //회원가입 제출
  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    // 에러 메세지
    if (!emailId.trim()) {
      newErrors.email = '이메일 아이디를 입력하세요.';
    }
    if (emailDomain === 'custom') {
      if (!customDomain.trim()) {
        newErrors.email = '도메인을 입력하세요. (예: gmail.com)';
      } else if (!isValidDomain(customDomain.trim())) {
        newErrors.email = '정확한 도메인명을 입력해주세요. (예: example.com)';
      }
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력하세요.';
    } else if (password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    }

    if (!passwordCheck) {
      newErrors.passwordCheck = '비밀번호 확인을 입력하세요.';
    } else if (password !== passwordCheck) {
      newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }

    if (!name.trim()) {
      newErrors.name = '이름을 입력하세요.';
    }

    if (!/^[0-9]{11}$/.test(phone)) {
      newErrors.phone = "전화번호는 '-'를 제외한 숫자 11자리여야 합니다.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const fullEmail = getFullEmail();
    if (!fullEmail) {
      window.alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    try {
      const payload = {
        email: fullEmail,
        password,
        username: name,
        nickname,
        phone,
      };

      await authApi.join(payload);

      window.alert('회원가입이 완료되었습니다.');
      navigate({ to: '/login' });
    } catch (error) {
      window.alert('회원가입 중 오류가 발생했습니다.');
    }
  }

  return (
    <main className='font-kakao-big-sans mx-auto max-w-xl px-4 py-10'>
      <h1 className='mb-6 text-xl font-bold'>회원가입</h1>
      <p className='mb-6 text-sm text-gray-600'>* 표시된 항목은 필수 입력입니다.</p>

      <form
        onSubmit={handleSubmit}
        className='space-y-10'
      >
        {/* 이메일 */}
        <div className='space-y-2'>
          <Label className='text-sm font-semibold'>
            이메일<span className='text-red-500'>*</span>
          </Label>
          <div className='flex items-center gap-2'>
            <Input
              id='emailId'
              type='text'
              placeholder='이메일 아이디 입력'
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className='flex-1'
            />
            <span>@</span>
            {/* 도메인 선택 or 직접 입력 */}
            {emailDomain === 'custom' ? (
              <div className='flex items-center gap-2'>
                <Input
                  type='text'
                  placeholder='도메인 입력'
                  className='w-[180px]'
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                />
                <Select
                  onValueChange={(val) => {
                    setEmailDomain(val);
                    if (val !== 'custom') setCustomDomain('');
                  }}
                >
                  <SelectTrigger className='w-[40px] px-2 text-xs'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='naver.com'>naver.com</SelectItem>
                    <SelectItem value='gmail.com'>gmail.com</SelectItem>
                    <SelectItem value='daum.com'>daum.com</SelectItem>
                    <SelectItem value='custom'>직접 입력</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
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
                  <SelectItem value='custom'>직접 입력</SelectItem>
                </SelectContent>
              </Select>
            )}

            <Button
              type='button'
              variant='default'
              className='text-sm'
              onClick={handleEmailCheck}
            >
              중복확인
            </Button>
          </div>

          {errors.email && <p className='text-sm text-red-600'>{errors.email}</p>}
        </div>

        {/* 비밀번호 */}
        <div className='space-y-2'>
          <Label
            htmlFor='password'
            className='text-sm font-semibold'
          >
            비밀번호 <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='password'
            type='password'
            placeholder='비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && <p className='text-sm text-red-600'>{errors.password}</p>}
        </div>

        {/* 비밀번호 확인*/}
        <div className='space-y-2'>
          <Label
            htmlFor='passwordCheck'
            className='text-sm font-semibold'
          >
            비밀번호 확인 <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='passwordCheck'
            type='password'
            placeholder='비밀번호 재입력'
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />

          {errors.passwordCheck && <p className='text-sm text-red-600'>{errors.passwordCheck}</p>}
        </div>

        {/* 이름 */}
        <div className='space-y-2'>
          <Label
            htmlFor='name'
            className='text-sm font-semibold'
          >
            이름 <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='name'
            type='text'
            placeholder='이름 입력'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {errors.name && <p className='text-sm text-red-600'>{errors.name}</p>}
        </div>

        {/* 닉네임 */}
        <div className='space-y-2'>
          <Label
            htmlFor='nickname'
            className='text-sm font-semibold'
          >
            닉네임
          </Label>
          <Input
            id='nickname'
            type='text'
            placeholder='닉네임 입력'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        {/* 전화번호 */}
        <div className='space-y-2'>
          <Label
            htmlFor='phone'
            className='text-sm font-semibold'
          >
            전화번호 <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='phone'
            type='text'
            placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {errors.phone && <p className='text-sm text-red-600'>{errors.phone}</p>}
        </div>

        {/* 버튼 영역 */}
        <div className='mt-10 space-y-3'>
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
            className='mt-3 w-full'
            onClick={() => {
              const ok = window.confirm('정말 가입을 취소하시겠습니까?');
              if (ok) navigate({ to: '..' });
            }}
          >
            가입 취소
          </Button>
        </div>
      </form>
    </main>
  );
}
