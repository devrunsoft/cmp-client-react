import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function index() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // effect logic here
  }, []);

  return (
    <Box>index</Box>
  );
}