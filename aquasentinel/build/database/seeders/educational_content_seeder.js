import { BaseSeeder } from '@adonisjs/lucid/seeders';
import EducationalContent from '#models/educational_content';
import User from '#models/user';
export default class EducationalContentSeeder extends BaseSeeder {
    async run() {
        const user = await User.firstOrFail();
        const tips = [
            {
                title: 'Seal Basement Walls to Prevent Flood Damage',
                content: 'Use waterproof sealant to protect walls from minor leaks and seepage during heavy rains.',
                category: 'flood',
            },
            {
                title: 'Keep Sandbags Ready',
                content: 'Store sandbags near entry points to redirect water flow during flash floods.',
                category: 'flood',
            },
            {
                title: 'Install Sump Pumps',
                content: 'Sump pumps are essential in low-lying areas prone to water accumulation.',
                category: 'flood',
            },
            {
                title: 'Use Mulch to Retain Soil Moisture',
                content: 'Mulching helps reduce evaporation and maintain soil health during drought.',
                category: 'drought',
            },
            {
                title: 'Fix Leaky Faucets Quickly',
                content: 'Even slow drips waste gallons of water over time — act fast.',
                category: 'drought',
            },
            {
                title: 'Capture Greywater for Landscaping',
                content: 'Reusing bath and sink water conserves fresh water for essential use.',
                category: 'drought',
            },
            {
                title: 'Recycle Properly',
                content: 'Separate plastics, metals, and organics to reduce landfill use.',
                category: 'environmental',
            },
            {
                title: 'Avoid Single-Use Plastics',
                content: 'Bring reusable bags, bottles, and containers to cut plastic pollution.',
                category: 'environmental',
            },
            {
                title: 'Join Local Tree Planting Events',
                content: 'Trees purify the air and reduce the heat island effect in cities.',
                category: 'environmental',
            },
            {
                title: 'Build a 72-Hour Emergency Kit',
                content: 'Include water, food, flashlights, first aid, and important documents.',
                category: 'emergency',
            },
            {
                title: 'Know Your Local Emergency Routes',
                content: 'Practice evacuation plans regularly to stay prepared.',
                category: 'emergency',
            },
            {
                title: 'Backup Power Supplies Are Critical',
                content: 'Solar chargers and battery backups can help keep devices running.',
                category: 'emergency',
            },
        ];
        for (const tip of tips) {
            await EducationalContent.create({
                ...tip,
                userId: user.id,
            });
        }
    }
}
