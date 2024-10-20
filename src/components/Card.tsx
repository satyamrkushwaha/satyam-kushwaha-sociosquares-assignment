import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './Card.module.css'


interface Props {
    name: string;
    username: string;
    email: string;
    company: string;
    website: string;
}

export default function OutlinedCard({ name, username, email, company, website }: Props) {
    return (
        <Box sx={{ minWidth: 275 }} className={styles.card}>
            <Card variant="outlined" className={styles.box}>
                <CardContent className={styles.content}>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {name}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {username}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>    {company}</Typography>
                    <Typography variant="body2">
                        {email}
                    </Typography>
                    <Typography variant="body2">
                        {website}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
