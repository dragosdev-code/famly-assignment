import api from "@/services/api";
import { Checkin, Child } from "@/services/children/types";

class ChildService {
  private api = api;

  private readonly ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
  private readonly GROUP_ID = "86413ecf-01a1-44da-ba73-1aeda212a196";
  private readonly INSTITUTION_ID = "dc4bd858-9e9c-4df7-9386-0d91e42280eb";

  /**
   * Fetch the list of children for the specified group and institution.
   */
  async listGroup(): Promise<{ children: Child[] }> {
    return await this.api.get(
      `/daycare/tablet/group?accessToken=${this.ACCESS_TOKEN}&groupId=${this.GROUP_ID}&institutionId=${this.INSTITUTION_ID}`
    );
  }

  /**
   * Check in a child with a given ID and a specified pickup time.
   * @param childId - The ID of the child to check in.
   * @param pickupTime - The pickup time for the child (e.g., "12:00").
   */
  async checkIn(childId: string, pickupTime: string): Promise<Checkin> {
    const payload = {
      accessToken: this.ACCESS_TOKEN,
      pickupTime,
    };

    return await this.api.post(`/v2/children/${childId}/checkins`, payload);
  }

  /**
   * Check out a child with a given ID.
   * @param childId - The ID of the child to check out.
   */
  async checkOut(childId: string): Promise<Checkin[]> {
    const payload = {
      accessToken: this.ACCESS_TOKEN,
    };

    return await this.api.post(`/v2/children/${childId}/checkout`, payload);
  }
}

export default new ChildService();
