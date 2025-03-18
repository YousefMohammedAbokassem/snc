import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function BronzeCard({ cardType }) {
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
            حصولك على مكتب إلكتروني مدى الحياة ضمن منصة HUN عبر موقعها
            الالكتروني WWW.HUN.CASH
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
              تحصل على عمولة فورية (قسيمة شرائية) عن كل مستخدم جديد عن طريقك
              ولمرة واحدة فقط وبحسب تصنيفه ضمن رصيدك الدولي لمكتبك الالكتروني
              ويمكنك تحويله للرصيد المحلي إذا رغبت وفق التسعير الأسبوعي من قبل
              إدارة المنصة لبلدك - كالتالي:
            </p>
            <ul className="mt-2">
              <li>1- للبطاقة البرونزية تحصل على / 0.25 قسيمة شرائية /.</li>
              <li>2- للبطاقة الفضية تحصل على / 0.50 قسيمة شرائية /.</li>
              <li>3- للبطاقة الذهبية تحصل على / 1.00 قسيمة شرائية /.</li>{" "}
              <li>4- للبطاقة VIP تحصل على / 2.50 قسيمة شرائية /.</li>
            </ul>
          </div>
        </li>
        {/* 4 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {" "}
            {t("fourthService")}
          </h5>
          <div className="text-lg mt-2">
            يتم إهداء رصيد دولي لمكتبك الالكتروني بقيمة /1.00 قسيمة شرائية/ من
            إدارة منصة HUN لتفعيل التبادل التجاري.
          </div>
        </li>
        {/* 5 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("fifthService")}
          </h5>
          <div className="text-lg mt-2">
            يتم تثبيت رصيد دولي للمستخدم بقيمة /0 قسيمة شرائية/ على سبيل الأمانة
            لدى منصةHUN -هذه الخدمة متوقفة حاليا.
          </div>
        </li>

        {/* 6 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("sixthService")}
          </h5>
          <div className="text-lg mt-2">
            عندما يصبح عدد المستخدمين عبر مكتبك الالكتروني عدد /10/ تصنيفاتهم
            برونزية وما فوق تحصل على مكافأة أولى من إدارة منصةHUN برصيد دولي
            قيمته /2.5 قسيمة شرائية/ ولمرة واحدة.
          </div>
        </li>

        {/* 7 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("seventhService")}
          </h5>
          <div className="text-lg mt-2">
            عندما يصبح عدد المستخدمين عبر مكتبك الالكتروني عدد /20/ (10 السابقين
            + 10 الجدد) تصنيفاتهم برونزية وما فوق تحصل على مكافأة ثانية من إدارة
            منصةHUN برصيد دولي قيمته /2.5 قسيمة شرائية/ ولمرة واحدة.
          </div>
        </li>

        {/* 8 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("eighthService")}
          </h5>
          <div className="text-lg mt-2">
            عندما يصبح عدد المستخدمين عبر مكتبك الالكتروني عدد /30/ (20 السابقين
            + 10 الجدد) تصنيفاتهم برونزية وما فوق تحصل على مكافأة ثالثة من إدارة
            منصةHUN برصيد دولي قيمته /2.5 قسيمة شرائية/ ولمرة واحدة.
          </div>
        </li>

        {/* 9 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("ninthService")}
          </h5>
          <div className="text-lg mt-2">
            عندما يصبح عدد المستخدمين عبر مكتبك الالكتروني عدد /40/ (30 السابقين
            + 10 الجدد) تصنيفاتهم برونزية وما فوق تحصل على مكافأة رابعة وأخيرة
            من إدارة منصةHUN برصيد دولي قيمته /2.5 قسيمة شرائية/ ولمرة واحدة.
          </div>
        </li>
        {/* 10 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("tenthService")}
          </h5>
          <div className="text-lg mt-2">
            <p>
              يحق لمستخدم هذه التصنيف بصرف رصيده المالي الالكتروني بقيمة/25
              قسيمة شرائية/ كل24ساعة من توقيت الصرف
            </p>
          </div>
        </li>
        {/* 11 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("eleventhService")}
          </h5>
          <div className="text-lg mt-2">
            <p>
              زيادة رصيدك المالي المحلي لدى مكتبك الالكتروني – يمكنك زيادة رصيدك
              المالي بالعملة الوطنية الالكترونية عن طريق مستخدمي المنصة أو
              فروعها المعتمدين أو البنوك المتعاقدة معها في أماكن تواجدك – عبر
              إحدى طرق التواصل الالكتروني مع إدارة المنصة.
            </p>
          </div>
        </li>
        {/* 12 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("twelfthService")}
          </h5>
          <div className="text-lg mt-2">
            <p>
              سحب رصيدك المالي المحلي من مكتبك الالكتروني – يمكنك سحب رصيدك
              المالي بالعملة الوطنية الالكترونية عن طريق مستخدمي المنصة أو
              فروعها المعتمدين أو البنوك المتعاقدة معها في أماكن تواجدك – عبر
              إحدى طرق التواصل الالكتروني مع إدارة المنصة.
            </p>
            <p className="text-[#C92C2C] text-xl mt-2">
              تـنـويــه: في حال تم الارسال عبر المكاتب الخاصة والصرافة والبنوك،
              فإن عمولة الارسال والاستلام على حساب المستخدم.
            </p>
          </div>
        </li>
        {/* 13 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("therteenthService")}
          </h5>
          <div className="text-lg mt-2">
            <p>
              الاستفادة من العروض والحسومات والحجوزات المقدمة لك من الفعاليات
              المتعاقدة مع المنصة في جميع أنحاء العالم.
            </p>
            <p className="text-[#C92C2C] text-xl mt-2">
              ملاحظة: الأسعار المسجلة للمنتجات والبضائع والموضحة في صفحة
              الفعاليات المتعاقدة مع المنصة لا تشمل اجور الشحن والتوصيل، وتبقى
              عمولة الارسال والاستلام على حساب المستخدم.
            </p>
          </div>
        </li>
        {/* manage */}
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
    </div>
  );
}
