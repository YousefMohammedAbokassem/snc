import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ZeroCard({ cardType }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="mt-3">
      <h4 className="text-lg font-bold">{t("cardProperties")}:</h4>
      <ul className="list-[square] marker:text-[#275963]">
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("firstService")}
          </h5>
          <div className="text-lg mt-2">
            حصولك على مكتب إلكتروني مدى الحياة ضمن منصة HUN عبر موقعنا
            الإلكتروني WWW.HUN.CASH.
          </div>
        </li>
        {/* 2 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {" "}
            {t("secondService")}
          </h5>
          <div className="text-lg mt-2">
            تفعيل عمليات (الدفع + الشراء) للقيام بالتبادلات التجارية بين مستخدمي
            المنصة حصراً عبر رقمك الخلوي.
          </div>
        </li>
        {/* 3 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {" "}
            {t("thirdService")}
          </h5>
          <div className="text-lg mt-2">
            <p className="text-xl">
              {" "}
              تحصل على عمولة فورية (قسيمة شرائية) عن كل مستخدم جديد عن طريقك
              ولمرة واحدة فقط وبحسب تصنيفه ضمن رصيدك الدولي لمكتبك الإلكتروني
              ويمكنك تحويله للرصيد المحلي إذا رغبت وفق التسعير الأسبوعي من قبل
              إدارة المنصة لبلدك - كالتالي:
            </p>
            <ul className="mt-2">
              <li>1- للبطاقة البرونزية تحصل على / 0.25 قسيمة شرائية /.</li>
              <li>2- للبطاقة الفضية تحصل على / 0.50 قسيمة شرائية /.</li>
              <li>3- للبطاقة الذهبية تحصل على / 1.00 قسيمة شرائية /.</li>{" "}
              <li>4- للبطاقة VIP تحصل على / 2.50 قسيمة شرائية /.</li>
            </ul>
            <p className="text-[#C92C2C] text-xl mt-2">
              تنويه - لا يستحق صاحب تصنيف زيرو أي عمولة مالية عن مستخدم جديد
              تصنيفه زيرو.
            </p>
          </div>
        </li>
        {/* 4 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {" "}
            {t("fourthService")}
          </h5>
          <div className="text-lg mt-2">
            لا يحق لصاحب هذا التصنيف المشاركة أو الدخول ببرنامج المكافآت المالية
            المقدم من إدارة المنصة وتنحصر هذه المكافآت للتصنيفات الأعلى.
          </div>
        </li>
        {/* 5 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("fifthService")}
          </h5>
          <div className="text-lg mt-2">
            تنحصر قيمة هذه البطاقة بالمستخدم فقط، دون تثبيت أي رصيد دولي له في
            مكتبه الإلكتروني للبدء بالتبادل التجاري.
          </div>
        </li>

        {/* 6 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("sixthService")}
          </h5>
          <div className="text-lg mt-2">
            يحق لمستخدم هذه التصنيف بصرف رصيده المالي الإلكتروني بقيمة / 15
            قسيمة شرائية / كل 24 ساعة من توقيت الصرف.
          </div>
        </li>

        {/* 7 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("seventhService")}
          </h5>
          <div className="text-lg mt-2">
            يحق لمستخدم هذه التصنيف بصرف رصيده المالي الإلكتروني الوطني بشكل
            كامل لفعاليته متى يشاء.
          </div>
        </li>

        {/* 8 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("eighthService")}
          </h5>
          <div className="text-lg mt-2">
            زيادة رصيدك المالي المحلي لدى مكتبك الإلكتروني - يمكنك زيادة رصيدك
            المالي بالعملة الوطنية الإلكترونية عن طريق مستخدمي المنصة أو فروعها
            المعتمدين أو البنوك المتعاقدة معها في أماكن تواجدك - عبر إحدى طرق
            التواصل الإلكتروني مع إدارة المنصة.
          </div>
        </li>

        {/* 9 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("ninthService")}
          </h5>
          <div className="text-lg mt-2">
            سحب رصيدك المالي المحلي من مكتبك الإلكتروني - يمكنك سحب رصيدك المالي
            بالعملة الوطنية الإلكترونية عن طريق مستخدمي المنصة أو فروعها
            المعتمدين أو البنوك المتعاقدة معها في أماكن تواجدك - عبر إحدى طرق
            التواصل الإلكتروني مع إدارة المنصة.
          </div>
          <p className="text-[#C92C2C] text-xl mt-2">
            تنويه - في حال تم الإرسال عبر المكاتب الخاصة والصرافة والبنوك، فإن
            عمولة الإرسال والاستلام على حساب المستخدم.
          </p>
        </li>
        {/* 10 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("tenthService")}
          </h5>
          <div className="text-lg mt-2">
            <p>
              الاستفادة من العروض والحسومات والحجوزات المقدمة لك من الفعاليات
              المتعاقدة مع المنصة في جميع أنحاء العالم.
            </p>
            <p className="mt-1">
              <span className="text-[#275963] font-bold">ملاحظة:</span> الأسعار
              المسجلة للمنتجات والبضائع والموضحة في صفحة الفعاليات المتعاقدة مع
              المنصة لا تشمل أجور الشحن والتوصيل، وتبقى عمولة الإرسال والاستلام
              على حساب المستخدم.
            </p>
          </div>
        </li>
        {/* 11 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("manageSite")}
          </h5>
          <div className="text-lg mt-2">
            <p>
              الحماية والأمان: الحفاظ على سرية وخصوصية العمليات المالية التي
              تقوم بها وأرشفتها ضمن مكتبك الإلكتروني مع ضمان المحافظة على الكتلة
              المالية المتواجدة بأرصدتك في حال فقدان هاتفك المحمول.
            </p>
          </div>
        </li>
      </ul>
      <button
        type="button"
        className={`my-8 border-[#CDCDCD] bg-[#275963] text-white dark:bg-[#E1B145]  border-[1px]  dark:text-white rounded-md px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145] font-bold flex items-center justify-center`}
        onClick={() => navigate(`/home/${cardType}/buyCard`)}
      >
        {t("buyCard")}
      </button>
    </div>
  );
}
