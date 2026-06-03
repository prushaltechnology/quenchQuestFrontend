import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import antdTheme from '../theme/antdTheme';

const { Paragraph } = Typography;

const CommonCard = ({ image, description }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.7,
                ease: 'easeOut',
            }}
            viewport={{ once: true }}
        >
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: antdTheme.token.borderRadius,
                    overflow: 'hidden',
                    minHeight: 300,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <img
                    src={image}
                    alt="Card"
                    style={{
                        width: '100%',
                        height: 120,
                        objectFit: 'cover',
                    }}
                />

                <div style={{ padding: 24, flexGrow: 1 }}>
                    <Paragraph
                        style={{
                            color: antdTheme.token.colorTextSecondary,
                            lineHeight: 1.7,
                            marginBottom: 0,
                        }}
                    >
                        {description}
                    </Paragraph>
                </div>
            </div>
        </motion.div>
    );
};

export default CommonCard;