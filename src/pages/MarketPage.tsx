import { useState } from 'react';

import ContentFrame from '../components/ContentFrame';
import DateSelector from '../components/DateSelector';
import MarkdownView from '../components/MarkdownView';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { EmptyNote, ErrorNote, LoadingNote } from '../components/StatusNotes';
import { useFetchText } from '../hooks/useFetchText';
import { useManifest } from '../hooks/useManifest';
import { useLanguage } from '../i18n/LanguageContext';
import { contentUrl } from '../lib/contentUrl';
import type { MarketItem } from '../lib/manifest';

interface TabBarProps {
  readonly tabs: readonly MarketItem[];
  readonly activeFile: string | null;
  readonly onSelect: (file: string) => void;
}

function TabBar({ tabs, activeFile, onSelect }: TabBarProps) {
  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab.file}
          type="button"
          className={tab.file === activeFile ? 'tab tab-active' : 'tab'}
          aria-pressed={tab.file === activeFile}
          onClick={() => onSelect(tab.file)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}

export default function MarketPage() {
  const { t, lang } = useLanguage();
  const { manifest, loading, error } = useManifest();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const entries = manifest?.sections.market ?? [];
  const activeDate = selectedDate ?? entries[0]?.date ?? null;
  const activeEntry =
    entries.find((entry) => entry.date === activeDate) ?? null;

  const items = activeEntry?.items ?? [];
  const mdItems = items.filter((item) => item.kind === 'md');
  const preferredMds = mdItems.filter((item) => item.lang === lang);
  const displayedMds = preferredMds.length > 0 ? preferredMds : mdItems;
  const showFallbackNote = preferredMds.length === 0 && mdItems.length > 0;
  const htmlItems = items.filter((item) => item.kind === 'html');
  const tabs = [...displayedMds, ...htmlItems];

  const activeTab =
    tabs.find((tab) => tab.file === selectedFile) ?? tabs[0] ?? null;
  const isMarkdownTab = activeTab !== null && activeTab.kind === 'md';
  const markdownUrl =
    isMarkdownTab && activeDate
      ? contentUrl('market', activeDate, activeTab.file)
      : null;
  const markdown = useFetchText(markdownUrl);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedFile(null);
  };

  return (
    <main className="page market-page">
      <PageHeader
        index={2}
        kicker={t('page.kicker.market')}
        title={t('nav.market')}
      />

      {loading ? <LoadingNote /> : null}
      {error ? <ErrorNote detail={error} /> : null}
      {manifest && entries.length === 0 ? <EmptyNote /> : null}

      {activeDate ? (
        <DateSelector
          dates={entries.map((entry) => entry.date)}
          value={activeDate}
          onChange={handleDateChange}
        />
      ) : null}

      {showFallbackNote ? (
        <p className="translation-note">{t('market.noTranslation')}</p>
      ) : null}

      {tabs.length > 0 ? (
        <TabBar
          tabs={tabs}
          activeFile={activeTab?.file ?? null}
          onSelect={setSelectedFile}
        />
      ) : null}
      {manifest && activeEntry && tabs.length === 0 ? <EmptyNote /> : null}

      {isMarkdownTab ? (
        <>
          {markdown.loading ? <LoadingNote /> : null}
          {markdown.error ? <ErrorNote detail={markdown.error} /> : null}
          {markdown.text !== null ? (
            <Reveal>
              <MarkdownView markdown={markdown.text} />
            </Reveal>
          ) : null}
        </>
      ) : null}

      {activeTab && activeTab.kind === 'html' && activeDate ? (
        <ContentFrame
          src={contentUrl('market', activeDate, activeTab.file)}
          title={activeTab.title}
        />
      ) : null}
    </main>
  );
}
