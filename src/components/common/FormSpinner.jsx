import React from 'react';
import { Box, CircularProgress, Typography, Stack } from '@mui/material';

const FormSpinner = (props) => {
    // Jika tidak sedang loading, tidak tampilkan apa-apa
    if (!props.open) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(18, 19, 20, 0.8)', // dark semi-transparent
                zIndex: 1, // Pastikan berada di atas konten lain
                borderRadius: 'inherit', // Sesuaikan dengan border radius parent
            }}
        >
            <Stack alignItems="center" spacing={2}>
                <CircularProgress color='text.primary' />
                {props.text && <Typography variant="body2" color="text.primary">{props.text}</Typography>}
            </Stack>
        </Box>
    );
};

export default FormSpinner;