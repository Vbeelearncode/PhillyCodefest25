import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import languages from './DropdownLanguages';

export default function LanguageSelect({ selectedLanguages, onLanguageChange, onSave }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageSelect = (language) => {
        if (!selectedLanguages.includes(language.code)) {
            onLanguageChange(prev => [...prev, language.code]);
        } else {
            onLanguageChange(selectedLanguages.filter(code => code !== language.code));
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && selectedLanguages.length > 0) {
            onSave();
            handleClose();
        }
    };

    React.useEffect(() => {
        if (anchorEl) {
            window.addEventListener('keypress', handleKeyPress);
        }
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [anchorEl, selectedLanguages]);

    const open = Boolean(anchorEl);

    return (
        <React.Fragment>
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    border: 1,
                    borderRadius: 7,
                    width: 188,
                    height: 55,
                    zIndex: 12,
                    position: 'relative',
                    marginLeft: 133.1,
                    marginTop: -7.4,
                    padding: '0 12px',
                    cursor: 'pointer'
                }}
            >
                <LanguageIcon style={{ color: 'white', marginRight: 8 }} />
                <Box sx={{
                    display: 'flex',
                    flexGrow: 1,
                    overflow: 'hidden',
                    alignItems: 'center'
                }}>
                    {selectedLanguages.length === 0 ? (
                        <Box sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Select languages
                        </Box>
                    ) : (
                        <>
                            {selectedLanguages.length > 0 && (
                                <Chip
                                    label={languages.find(lang => lang.code === selectedLanguages[0]).label}
                                    size="small"
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        mr: 0.5,
                                        height: 24
                                    }}
                                />
                            )}
                            {selectedLanguages.length > 1 && (
                                <Chip
                                    label={`+${selectedLanguages.length - 1}`}
                                    size="small"
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        height: 24
                                    }}
                                />
                            )}
                        </>
                    )}
                </Box>
                <ArrowDropDownIcon
                    sx={{
                        color: 'white',
                        fontSize: 20,
                        marginLeft: 'auto'
                    }}
                />
            </Box>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        width: 280,
                        maxHeight: 300
                    }
                }}
            >
                <List sx={{ padding: 0 }}>
                    {languages.map((language) => {
                        const isSelected = selectedLanguages.includes(language.code);
                        return (
                            <ListItem key={language.code} disablePadding>
                                <ListItemButton
                                    onClick={() => handleLanguageSelect(language)}
                                    selected={isSelected}
                                >
                                    <ListItemText primary={language.label} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Popover>
        </React.Fragment>
    );
}