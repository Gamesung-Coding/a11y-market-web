import { authApi } from '@/api/auth';
import { JoinForm } from '@/components/auth/join-form';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_auth/join/')({
  component: RouteComponent,
});

function RouteComponent() {
  const steps = [
    {
      id: 'userEmail',
      label: '이메일',
      placeholder: 'example@email.com',
      type: 'email',
      autoComplete: 'username',
      description: '로그인에 사용할 이메일 주소를 입력해주세요.',
    },
    {
      id: 'userPass',
      label: '비밀번호',
      placeholder: '********',
      type: 'password',
      autoComplete: 'new-password',
      description: '안전한 비밀번호를 입력해주세요.',
    },
    {
      id: 'userName',
      label: '이름',
      placeholder: '홍길동',
      type: 'text',
      autoComplete: 'name',
      description: '실명을 입력해주세요.',
    },
    {
      id: 'userNickname',
      label: '닉네임',
      placeholder: '길동이',
      type: 'text',
      autoComplete: 'nickname',
      description: '다른 사용자에게 보여질 닉네임을 입력해주세요.',
    },
    {
      id: 'userPhone',
      label: '휴대폰 번호',
      placeholder: '010-1234-5678',
      type: 'tel',
      autoComplete: 'tel',
      description: '본인 확인을 위해 휴대폰 번호를 입력해주세요.',
    },
  ];

  const [formData, setFormData] = useState<any>({
    userEmail: '',
    userPass: '',
    userPassConfirm: '',
    userName: '',
    userNickname: '',
    userPhone: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const [submitCheckDialogOpen, setSubmitCheckDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'userEmail':
        if (!value) return '이메일을 입력해주세요';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return '올바른 이메일 형식이 아닙니다';
        }
        return null;
      case 'userName':
        if (!value) return '이름을 입력해주세요';
        if (value.length < 2) return '이름은 2자 이상이어야 합니다';
        return null;
      case 'userPass':
        if (!value) return '비밀번호를 입력해주세요';
        if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다';
        return null;
      case 'userPassConfirm':
        if (!value) return '비밀번호 확인을 입력해주세요';
        if (value !== formData.userPass) return '비밀번호가 일치하지 않습니다';
        return null;
      case 'userNickname':
        if (!value) return '닉네임을 입력해주세요';
        if (value.length < 2) return '닉네임은 2자 이상이어야 합니다';
        return null;
      case 'userPhone':
        if (!value) return '휴대폰 번호를 입력해주세요';
        // 숫자만 있는지 확인
        if (!/^\d{10,11}$/.test(value.replace(/-/g, ''))) {
          return '올바른 휴대폰 번호 형식이 아닙니다';
        }
        return null;
      default:
        return null;
    }
  };

  const validateCheckSteps = async (currentFocusId: string) => {
    const data = formData[currentFocusId];

    if (currentFocusId === 'userEmail') {
      try {
        const isAvailable = await authApi.checkEmailExists(data);

        if (!isAvailable) {
          setErrors((prev: any) => ({
            ...prev,
            userEmail: '이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.',
          }));
          return false;
        }
      } catch (error) {
        setErrors((prev: any) => ({
          ...prev,
          userEmail: '이메일 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.',
        }));
        return false;
      }
    } else if (currentFocusId === 'userPass') {
      // No async validation for password
    } else if (currentFocusId === 'userNickname') {
      try {
        const isAvailable = await authApi.checkNicknameExists(data);

        if (!isAvailable) {
          setErrors((prev: any) => ({
            ...prev,
            userNickname: '이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.',
          }));
          return false;
        }
      } catch (error) {
        setErrors((prev: any) => ({
          ...prev,
          userNickname: '닉네임 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.',
        }));
        return false;
      }
    } else if (currentFocusId === 'userPhone') {
      try {
        const isAvailable = await authApi.checkPhoneExists(data);

        if (!isAvailable) {
          setErrors((prev: any) => ({
            ...prev,
            userPhone: '이미 사용 중인 휴대폰 번호입니다. 다른 번호를 입력해주세요.',
          }));
          return false;
        }
      } catch (error) {
        setErrors((prev: any) => ({
          ...prev,
          userPhone: '휴대폰 번호 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.',
        }));
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await authApi.join(formData);

      setIsCompleted(true);
      setSubmitCheckDialogOpen(false);
    } catch (error) {
      setErrors({ submit: '서버 오류로 인해 회원가입에 실패했습니다. 나중에 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <JoinForm
        steps={steps}
        formTitle={`회원가입`}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        isCompleted={isCompleted}
        isSubmitting={isSubmitting}
        submitCheckDialogOpen={submitCheckDialogOpen}
        setSubmitCheckDialogOpen={setSubmitCheckDialogOpen}
        validateField={validateField}
        validateCheckSteps={validateCheckSteps}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
