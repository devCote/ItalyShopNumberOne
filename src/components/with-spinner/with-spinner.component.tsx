import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

const WithSpinner = (WrapedComponent: any) => ({
  isLoading,
  ...otherProps
}: any) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrapedComponent {...otherProps} />
  );
};

export default WithSpinner;
