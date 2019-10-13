import React, { memo } from 'react';

import { Paper } from '@material-ui/core';

export const Layout = memo(props => {
  return (
    <Paper
      elevation={0}
      style={{ padding: 0, margin: 0, backgroundColor: '#fafafa'}}
    >
      {props.children}
    </Paper>
  );
});
