/*
|--------------------------------------------------------------------------
| Routes file – AquaSentinel
|--------------------------------------------------------------------------
*/
import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
// Contrôleurs
import AuthController from '#controllers/auth_controller';
import UsersController from '#controllers/users_controller';
import ReportsController from '#controllers/reports_controller';
import AlertController from '#controllers/alerts_controller';
import ForecastController from '#controllers/forecasts_controller';
import EducationalContentController from '#controllers/educational_contents_controller';
import InvestmentController from '#controllers/investments_controller';
import SensorDataController from '#controllers/sensordata_controller';
/*
|--------------------------------------------------------------------------
| ROUTES PUBLIQUES
|--------------------------------------------------------------------------
*/
router.get('/', async ({ view }) => {
    return view.render('pages/landing'); // Crée le fichier views/pages/landing.edge
});
// Get alerts by location (query params: ?lat=xx&lon=yy)
router.get('/alerts/location', 'AlertController.byLocation');
// Tableau de bord public
router.get('/publicDashboard', [AuthController, 'showPublicDashboard']);
router.get('/dashboard', [AuthController, 'showDashboard']).use(middleware.auth());
// Authentification
router.group(() => {
    router.get('/login', [AuthController, 'showLoginForm']);
    router.post('/login', [AuthController, 'login']);
    router.get('/register', [AuthController, 'showRegisterForm']);
    router.post('/register', [AuthController, 'register']);
}).use(middleware.guest());
/*
|--------------------------------------------------------------------------
| ROUTES UTILISATEURS CONNECTÉS
|--------------------------------------------------------------------------
*/
router.group(() => {
    // Déconnexion
    router.post('/auth/logout', [AuthController, 'logout']).use(middleware.auth());
    // Profil utilisateur
    router.get('/auth/profile', [UsersController, 'show']);
    router.post('/auth/profile', [UsersController, 'update']);
    router.delete('/auth/account', [UsersController, 'destroy']);
    // Lecture publique (alerts, forecasts, educational)
    router.get('/alerts', [AlertController, 'index']);
    router.get('/alerts/:id', [AlertController, 'show']);
    router.post('/alerts', [AlertController, 'store']);
    router.get('/forecasts', [ForecastController, 'index']);
    router.get('/forecasts/:id', [ForecastController, 'show']);
    router.post('/forecasts', [ForecastController, 'store']);
    // Contenus éducatifs
    router.get('/educational_contents', [EducationalContentController, 'index']);
    router.get('/educational_contents/category/:category', [EducationalContentController, 'byCategory']);
    router.get('/educational_contents/detail/:id', [EducationalContentController, 'showDetail']);
    router.get('/educational_contents/api/:id', [EducationalContentController, 'show']); // <-- keep this last
    router.post('/educational_contents', [EducationalContentController, 'store']);
    router.get('/contribute_content', [EducationalContentController, 'create']);
    router.post('/contribute_content', [EducationalContentController, 'store']);
});
/*
|--------------------------------------------------------------------------
| ROUTES MODÉRATEUR OU ADMIN
|--------------------------------------------------------------------------
*/
router.group(() => {
    router.put('/alerts/:id', [AlertController, 'update']);
    router.delete('/alerts/:id', [AlertController, 'destroy']);
    router.put('/forecasts/:id', [ForecastController, 'update']);
    router.delete('/forecasts/:id', [ForecastController, 'destroy']);
    router.put('/educational_contents/:id', [EducationalContentController, 'update']);
    router.delete('/educational_contents/:id', [EducationalContentController, 'destroy']);
    router.resource('/reports', ReportsController).apiOnly();
}).use([middleware.auth(), middleware.moderatorOrAdmin]);
/*
|--------------------------------------------------------------------------
| ROUTES ADMIN UNIQUEMENT
|--------------------------------------------------------------------------
*/
router.group(() => {
    router.resource('/users', UsersController).apiOnly();
    router.resource('/investments', InvestmentController).apiOnly();
    router.resource('/sensordata', SensorDataController).apiOnly();
}).use([middleware.auth(), middleware.admin]);
