var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import SensorData from '#models/sensor_datum';
import Alert from '#models/alert';
import EducationalContent from '#models/educational_content';
import Investment from '#models/investment';
export default class Forecast extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Forecast.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Forecast.prototype, "title", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Forecast.prototype, "riskType", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Forecast.prototype, "riskLevel", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Forecast.prototype, "message", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Forecast.prototype, "basedOnSensor", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Forecast.prototype, "region", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Forecast.prototype, "waterLevel", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Forecast.prototype, "rainfall", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Forecast.prototype, "soilMoisture", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Forecast.prototype, "temperature", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Forecast.prototype, "latitude", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Forecast.prototype, "longitude", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Forecast.prototype, "forecastDate", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Forecast.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Forecast.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => SensorData, {
        foreignKey: 'basedOnSensor',
    }),
    __metadata("design:type", Object)
], Forecast.prototype, "sensorData", void 0);
__decorate([
    hasMany(() => Investment),
    __metadata("design:type", Object)
], Forecast.prototype, "investments", void 0);
__decorate([
    hasMany(() => Alert),
    __metadata("design:type", Object)
], Forecast.prototype, "alerts", void 0);
__decorate([
    hasMany(() => EducationalContent),
    __metadata("design:type", Object)
], Forecast.prototype, "educationalContents", void 0);
//# sourceMappingURL=forecast.js.map