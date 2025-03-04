import type { CreateOrganizationParams, OrganizationMembershipResource, OrganizationResource } from '@clerk/types';

import { deprecated } from '../../deprecated';
import { useClerkInstanceContext } from '../contexts';

type UseOrganizationsReturn =
  | {
      isLoaded: false;

      /**
       * @deprecated Use `createOrganization` from `useOrganizationList`
       * Example: `const {createOrganization} = useOrganizationList()`
       */
      createOrganization: undefined;

      /**
       * @deprecated Use `memberships` from `useOrganization`
       * Example: `const {memberships} = useOrganization()`
       */
      getOrganizationMemberships: undefined;

      /**
       * @deprecated Use `getOrganization` from `useClerk`
       * Example: `const {getOrganization} = useClerk()`
       */
      getOrganization: undefined;
    }
  | {
      isLoaded: true;
      /**
       * @deprecated Use `createOrganization` from `useOrganizationList`
       * Example: `const {createOrganization} = useOrganizationList()`
       */
      createOrganization: (params: CreateOrganizationParams) => Promise<OrganizationResource>;

      /**
       * @deprecated Use `memberships` from `useOrganization`
       * Example: `const {memberships} = useOrganization()`
       */
      getOrganizationMemberships: () => Promise<OrganizationMembershipResource[]>;

      /**
       * @deprecated Use `getOrganization` from `useClerk`
       * Example: `const {getOrganization} = useClerk()`
       */
      getOrganization: (organizationId: string) => Promise<OrganizationResource | undefined>;
    };

type UseOrganizations = () => UseOrganizationsReturn;

/**
 * @deprecated Use useOrganizationList, useOrganization, or useClerk instead
 */
export const useOrganizations: UseOrganizations = () => {
  deprecated('useOrganizations', 'Use useOrganizationList, useOrganization, or useClerk instead.');
  const clerk = useClerkInstanceContext();
  if (!clerk.loaded) {
    return {
      isLoaded: false,
      createOrganization: undefined,
      getOrganizationMemberships: undefined,
      getOrganization: undefined,
    };
  }

  return {
    isLoaded: true,
    createOrganization: clerk.createOrganization,
    getOrganizationMemberships: clerk.getOrganizationMemberships,
    getOrganization: clerk.getOrganization,
  };
};
