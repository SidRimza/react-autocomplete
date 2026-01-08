import React from 'react';

type WithLoaderProps = {
  loading: boolean;
};

export function withLoader<P extends object>(
  Component: React.ComponentType<P>
) {
  const WrappedComponent: React.FC<P & WithLoaderProps> = ({
    loading,
    ...props
  }) => {
    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...(props as P)} />;
  };

  return WrappedComponent;
}
