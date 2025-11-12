import React from "react";
import { useTranslation } from "react-i18next";

function Joinus() {
  const { t } = useTranslation();

  return (
    <div className="px-4">
      <div className="mx-auto md:px-3 max-w-4xl bg-[#708238] py-12 text-center mb-12 rounded-xl">
        <h3 className="text-2xl lg:text-4xl font-bold text-white leading-snug drop-shadow-lg">
          {t('joinus_title_part1')}{" "}
          <span className="text-[#FFA500] font-extrabold">{t('joinus_title_part2')}</span>
        </h3>

        <button className="bg-white mt-8 py-2 px-8 rounded-xl hover:bg-[#FFA500] hover:text-white transition-colors duration-300">
          {t('join_us_button')}
        </button>
      </div>
    </div>
  );
}

export default Joinus;