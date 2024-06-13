import { Box } from '@mui/system';
import i18n from 'i18n/i18n';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { colors } from 'theme';
import { styled } from '@mui/system';
import { ClickAwayListener } from '@mui/material';

type LanguageCode = 'en' | 'ro';
type LanguageLabel = 'English' | 'Romanian';

const languages: Record<LanguageCode, LanguageLabel> = {
  en: 'English',
  ro: 'Romanian',
};

const styles = {
  wrapper: {
    backgroundColor: colors.bg.lightBlue1,
    borderRadius: '4px',
    color: colors.font.blue,
    width: '100px',
    fontSize: '12px',
    cursor: 'pointer',
  },
};

const StyledLi = styled('li')({
  padding: '2px 4px',
  '&:nth-child(even)': {
    backgroundColor: colors.bg.lightBlue2,
  },
});

const LanguageSwitcherComponent = (): JSX.Element => {
  const [languageCode, setLanguageCode] = useState<LanguageCode>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const userLanguageCode = (localStorage.getItem('i18nextLng') || 'en') as LanguageCode;
    setLanguageCode(userLanguageCode);
  }, []);

  const onDropdownClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onLanguageClick = useCallback((e) => {
    const languageCode = e.target.dataset.lang;
    setLanguageCode(languageCode);
    setIsOpen(false);
    i18n.changeLanguage(languageCode);
    localStorage.setItem('i18nextLng', languageCode);
  }, []);

  const currentLanguage = languages[languageCode];

  if (isOpen) {
    return (
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <Box sx={styles.wrapper} ref={dropdownRef}>
          <ul
            style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}
            onClick={onLanguageClick}
          >
            {Object.keys(languages).map((languageCode) => {
              const languageLabel = languages[languageCode];
              return (
                <StyledLi key={languageCode} data-lang={languageCode}>
                  {languageLabel}
                </StyledLi>
              );
            })}
          </ul>
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <Box sx={{ ...styles.wrapper, padding: '2px 4px' }} onClick={onDropdownClick}>
      {currentLanguage}
    </Box>
  );
};

export const LanguageSwitcher = memo(LanguageSwitcherComponent);
