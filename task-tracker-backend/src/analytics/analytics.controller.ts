import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.analyticsService.findOne(+id);
  }
}
