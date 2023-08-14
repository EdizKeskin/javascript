import React from 'react';

import type { SignInButtonProps, WithClerkProp } from '../types';
import { assertSingleChild, normalizeWithDefaultValue, safeExecute } from '../utils';
import { withClerk } from './withClerk';

export const SignInButton = withClerk(({ clerk, children, ...props }: WithClerkProp<SignInButtonProps>) => {
  const { afterSignInUrl, afterSignUpUrl, redirectUrl, mode, initialValues, ...rest } = props;

  children = normalizeWithDefaultValue(children, 'Sign in');
  const child = assertSingleChild(children)('SignInButton');

  const clickHandler = () => {
    const opts = { afterSignInUrl, afterSignUpUrl, redirectUrl, initialValues };
    if (mode === 'modal') {
      return clerk.openSignIn(opts);
    }
    return clerk.redirectToSignIn(opts);
  };

  const wrappedChildClickHandler: React.MouseEventHandler = async e => {
    await safeExecute((child as any).props.onClick)(e);
    return clickHandler();
  };

  const childProps = { ...rest, onClick: wrappedChildClickHandler };
  return React.cloneElement(child as React.ReactElement<unknown>, childProps);
}, 'SignInButton');
