// src/routes/products/$productId.jsx
import SellerTrustInfo from '@/components/product/seller-trust-info';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

// 임시 상품 데이터 (백엔드 연동 전까지 UI 확인용)
const mockProduct = {
  id: 1,
  name: '상품명',
  price: 0,
  sellerName: '판매자명',
  sellerGrade: '우수',
  a11yGuarantee: true,
  shippingInfo: ['배송정보', '무료배송'],
  summary: '상품정보 요약',
  options: [
    { id: 'opt1', label: '옵션1', values: ['옵션 1-1', '옵션 1-2'] },
    { id: 'opt2', label: '옵션2', values: ['옵션 2-1', '옵션 2-2'] },
  ],
};

// 상품문의(Q&A) 영역은 현재 사용 X
// 필요해지면 아래 mockQnaList와 activeTab === "qna" 블록을 다시 활성화하면 됨.
// const mockQnaList = [ ... ];

function ProductDetailPage() {
  const { productId } = Route.useParams(); // 실제 연동 시 사용 예정

  // 기본 탭은 상세정보로
  const [activeTab, setActiveTab] = useState('details');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1); // 수량 상태

  const handleChangeOption = (optionId, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  const handleBuyNow = () => {
    // TODO: 바로구매 로직
    console.log('Buy Now', {
      productId,
      selectedOptions,
      quantity,
    });
  };

  const handleAddToCart = () => {
    // TODO: 장바구니 담기 로직
    console.log('Add to Cart', {
      productId,
      selectedOptions,
      quantity,
    });
  };

  // select ~ button 을 하나의 form 으로 묶어서 서버 제출 구조에 맞춤
  const handleSubmitOrder = (event) => {
    event.preventDefault();
    const action = event.nativeEvent.submitter?.value;

    if (action === 'buy') {
      handleBuyNow();
    } else if (action === 'cart') {
      handleAddToCart();
    }
  };

  return (
    <main
      className='mx-auto mt-20 max-w-5xl px-4 py-10 text-[#333333]'
      aria-label='상품 상세 정보 페이지'
    >
      {/* 상단 상세 영역 */}
      <section
        className='flex flex-col gap-8 md:flex-row'
        aria-label='상품 기본 정보 영역'
      >
        {/* 이미지 영역 */}
        <div className='md:w-1/2'>
          <div
            className='flex aspect-square items-center justify-center bg-gray-200 text-3xl text-gray-500'
            role='img'
            aria-label={`${mockProduct.name} 대표 이미지`}
          >
            image
          </div>
        </div>

        {/* 정보 영역 */}
        <div className='space-y-4 md:w-1/2'>
          <div className='flex items-center gap-2 text-sm'>
            {/* 판매자 정보 */}
            <SellerTrustInfo
              // sellerId={mockProduct.sellerId}
              sellerName={mockProduct.sellerName}
              sellerGrade={mockProduct.sellerGrade}
              a11yGuarantee={mockProduct.a11yGuarantee}
            />
            <span className='text-gray-600'>{mockProduct.sellerName} &gt; </span>
          </div>
          {/* 상품명 / 가격 */}
          <div
            className='space-y-1'
            aria-label='상품명 및 가격'
          >
            <h1 className='font-kakao-big text-xl font-semibold'>{mockProduct.name}</h1>
            <p className='font-kakao-big text-lg font-bold'>
              {mockProduct.price.toLocaleString('ko-KR')}원
            </p>
          </div>

          {/* 배송 정보 */}
          <div
            className='text-xs leading-5'
            aria-label='배송 정보'
          >
            {mockProduct.shippingInfo.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>

          {/* 상품정보 요약 박스 */}
          <div aria-label='상품정보 요약'>
            <div className='mb-1 text-xs'>상품정보 요약</div>
            <div className='h-24 border border-gray-300 bg-gray-100 p-3 text-xs'>
              {mockProduct.summary}
            </div>
          </div>

          {/* 옵션 + 수량 + 버튼을 하나의 form 으로 묶음 */}
          <form
            className='space-y-3'
            aria-label='옵션 및 수량 선택 폼'
            onSubmit={handleSubmitOrder}
          >
            {/* 옵션 선택 */}
            <div
              className='space-y-2'
              aria-label='옵션 선택 영역'
            >
              {mockProduct.options.map((opt) => (
                <div
                  key={opt.id}
                  className='flex flex-col gap-1'
                >
                  <label
                    className='text-xs'
                    htmlFor={opt.id}
                    aria-label={`${opt.label} 선택 레이블`}
                  >
                    {opt.label}
                  </label>
                  <select
                    id={opt.id}
                    className='h-8 w-full border border-gray-300 bg-[#f5f5f5] px-2 text-xs'
                    value={selectedOptions[opt.id] || ''}
                    onChange={(e) => handleChangeOption(opt.id, e.target.value)}
                    aria-label={`${opt.label} 선택`}
                  >
                    <option value=''>{opt.label}</option>
                    {opt.values.map((v) => (
                      <option
                        key={v}
                        value={v}
                      >
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* 수량 입력 */}
            <div
              className='flex items-center gap-2'
              aria-label='수량 선택'
            >
              <label
                htmlFor='quantity'
                className='font-kakao-big text-xs'
                aria-label='상품 수량 입력 레이블'
              >
                수량
              </label>
              <input
                id='quantity'
                type='number'
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className='h-8 w-20 border border-gray-300 px-2 text-xs'
                aria-label='상품 수량 입력'
              />
            </div>

            {/* 버튼 영역 */}
            <div
              className='flex gap-2 pt-2'
              aria-label='구매 및 장바구니 버튼'
            >
              <Button
                type='submit'
                name='action'
                value='buy'
                variant='outline'
                className='font-kakao-big h-10 flex-1 rounded-none'
                aria-label='해당 상품 바로 구매'
              >
                Buy Now
              </Button>
              <Button
                type='submit'
                name='action'
                value='cart'
                className='font-kakao-big h-10 flex-1 rounded-none'
                aria-label='해당 상품 장바구니에 담기'
              >
                Add to Cart
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* 탭 메뉴 */}
      <section
        className='mt-10 border border-gray-300'
        aria-label='상품 상세 하단 탭 메뉴'
      >
        <div
          className='grid grid-cols-2 text-sm'
          role='tablist'
          aria-label='상품 상세 정보와 배송 안내 탭'
        >
          <Button
            type='button'
            variant={activeTab === 'details' ? 'default' : 'ghost'}
            className='font-kakao-big h-12 w-full rounded-none border-r border-gray-300'
            onClick={() => setActiveTab('details')}
            role='tab'
            aria-selected={activeTab === 'details'}
            aria-label='상세정보 탭'
          >
            상세정보
          </Button>

          {/* 상품문의 탭 (현재 미사용)
          <Button
            type="button"
            variant={activeTab === "qna" ? "default" : "ghost"}
            className="rounded-none border-r border-gray-300 h-12 w-full font-kakao-big"
            onClick={() => setActiveTab("qna")}
            role="tab"
            aria-selected={activeTab === "qna"}
            aria-label="상품문의 탭"
          >
            상품문의
          </Button>
          */}

          <Button
            type='button'
            variant={activeTab === 'shipping' ? 'default' : 'ghost'}
            className='font-kakao-big h-12 w-full rounded-none'
            onClick={() => setActiveTab('shipping')}
            role='tab'
            aria-selected={activeTab === 'shipping'}
            aria-label='배송 및 교환, 반품 안내 탭'
          >
            배송/교환/반품 안내
          </Button>
        </div>
      </section>

      {/* 탭 컨텐츠 영역 */}
      <section className='mt-6'>
        {activeTab === 'details' && (
          <div
            className='flex h-64 items-center justify-center border border-gray-200 text-sm text-gray-500'
            role='tabpanel'
            aria-label='상세정보 내용'
          >
            상세정보 컨텐츠 영역 (상세 이미지, 설명 등)
          </div>
        )}

        {activeTab === 'shipping' && (
          <div
            className='flex h-64 items-center justify-center border border-gray-200 text-sm text-gray-500'
            role='tabpanel'
            aria-label='배송, 교환 및 반품 안내 내용'
          >
            배송/교환/반품 안내 내용 영역
          </div>
        )}

        {/* 상품문의(Q&A) 탭 컨텐츠 (현재 전체 주석 처리)
        {activeTab === "qna" && ( ... )}
        */}
      </section>
    </main>
  );
}

// TanStack Router – /products/:productId 경로
export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
});
