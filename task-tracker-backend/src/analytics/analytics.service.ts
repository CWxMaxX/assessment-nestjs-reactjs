import { Injectable } from "@nestjs/common";
import { analyticsData } from "src/data/analyticsData";

@Injectable()
export class AnalyticsService {
  findOne(id: number) {
    if (id) {
      return analyticsData;
    }
    return {};
  }
}
