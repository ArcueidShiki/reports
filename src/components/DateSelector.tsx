import { useId, type ChangeEvent } from 'react';

import { useLanguage } from '../i18n/LanguageContext';

interface DateSelectorProps {
  readonly dates: readonly string[];
  readonly value: string;
  readonly onChange: (date: string) => void;
}

/** Accessible date picker: a labelled <select> over report dates. */
export default function DateSelector({
  dates,
  value,
  onChange,
}: DateSelectorProps) {
  const { t } = useLanguage();
  const selectId = useId();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="date-selector">
      <label htmlFor={selectId}>{t('common.selectDate')}</label>
      <select id={selectId} value={value} onChange={handleChange}>
        {dates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
}
