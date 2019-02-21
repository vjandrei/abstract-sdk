// @flow
import { inferShareId } from "../utils";
import type {
  OrganizationDescriptor,
  Share,
  ShareDescriptor,
  ShareInput
} from "../types";
import BaseEndpoint from "./BaseEndpoint";

export default class Activities extends BaseEndpoint {
  create<T: Share>(
    descriptor: OrganizationDescriptor,
    shareInput: ShareInput
  ): Promise<T> {
    return this.request<Promise<T>>({
      api: async () => {
        return this.apiRequest("share_links", {
          method: "POST",
          body: {
            ...descriptor,
            ...shareInput,
            commitSha: (shareInput: any).sha
          }
        });
      }
    });
  }

  info<T: Share>(descriptor: ShareDescriptor): Promise<T> {
    return this.request<Promise<T>>({
      api: () => {
        return this.apiRequest(`share_links/${inferShareId(descriptor)}`);
      }
    });
  }
}