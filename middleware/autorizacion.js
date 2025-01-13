// middleware/autorizacion.js
const authorize = (role) => {
    return (req, res, next) => {
        console.log('Role requerido:', role); // Para debugging
        console.log('Role del usuario:', req.userRole); // Para debugging
        
        if (req.userRole === undefined) {
            return res.status(403).json({ message: 'No autenticado - Role no encontrado' });
        }
        
        // Convertimos ambos a números para asegurar una comparación correcta
        if (Number(req.userRole) !== Number(role)) {
            return res.status(403).json({ 
                message: 'Acceso denegado: No tienes el rol necesario',
                requiredRole: role,
                yourRole: req.userRole
            });
        }
        next();
    };
};

const authorize2 = (role1, role2) => {
    return (req, res, next) => {
        console.log('Role requerido:', role1, ' o ', role2); // Para debugging
        console.log('Role del usuario:', req.userRole); // Para debugging
        
        if (req.userRole === undefined) {
            return res.status(403).json({ message: 'No autenticado - Role no encontrado' });
        }
        
        // Convertimos ambos a números para asegurar una comparación correcta
        if ( (Number(req.userRole) !== Number(role1)) && (Number(req.userRole) !== Number(role2)) ) {
            return res.status(403).json({ 
                message: 'Acceso denegado: No tienes el rol necesario',
                requiredRole: '1 o 2',
                yourRole: req.userRole
            });
        }
        next();
    };
};

module.exports = {authorize, authorize2};