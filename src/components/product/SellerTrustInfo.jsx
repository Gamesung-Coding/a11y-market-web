// src/components/product/SellerTrustInfo.jsx
import { ShieldCheck } from 'lucide-react';

function SellerTrustInfo({ sellerId, sellerName, sellerGrade, a11yGuarantee }) {
  return (
    <div
      className='flex items-center gap-2 text-xs'
      aria-label='판매자 신뢰 정보'
    >
      {/* A11y 인증 마크 */}
      {a11yGuarantee && (
        <span
          className='flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700'
          aria-label='접근성 인증 판매자'
        >
          <ShieldCheck
            className='h-3.5 w-3.5'
            aria-hidden='true'
          />
          접근성 인증
        </span>
      )}

      {/* 판매자 등급 뱃지 */}
      <span
        className='rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700'
        aria-label={`판매자 등급 ${sellerGrade}`}
      >
        {sellerGrade}
      </span>

      {/* 판매자명 클릭 -> 판매자 스토어 페이지 (개발중) */}
      {/* <Link to="/sellers/$sellerId"
        params={{ sellerId }}
        className="ml-2 text-xs font-medium text-gray-600 hover:underline">
            {sellerName} &gt;
        </Link> */}
    </div>
  );
}

export default SellerTrustInfo;
