"use client"
import { FaTruckLoading } from 'react-icons/fa';
import { useLoading } from './loading_context';
import styles from './LoadingModal.module.css'; // Assuming you create a CSS module for styling
import { LoadScriptNext } from '@react-google-maps/api';
import { Audio, Circles, RotatingLines } from 'react-loader-spinner';
import Modal from 'react-modal';
import React from 'react';

const LoadingModal = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <Modal
            isOpen={isLoading}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(128, 128, 128, 0.75)', // grey barrier with transparency
                    display: 'flex', // Enable flexbox
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                    zIndex: 1000, // Ensure it is above other content
                },
                content: {
                    border: 'none', // No border around the loader
                    background: 'transparent', // No background on the content area
                    position: 'static', // Reset default position styles
                    padding: 0,
                    inset: 'auto', // Remove default content positioning
                },
            }}
        >
            <RotatingLines
                visible={true}
                width="40"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
        </Modal>

    );
};

export default LoadingModal;
