import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Briefcase, Zap, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-8"
          >
            <div className="text-9xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              404
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Page non trouvée
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.05, translateY: -4 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-blue-600"
            >
              <Home className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Accueil</h3>
              <p className="text-sm text-slate-600">
                Retourner à la page d'accueil
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, translateY: -4 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/#services"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-green-600"
            >
              <Briefcase className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Nos Services</h3>
              <p className="text-sm text-slate-600">
                Découvrir nos services de rénovation
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, translateY: -4 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/#projects"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-amber-600"
            >
              <Zap className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Réalisations</h3>
              <p className="text-sm text-slate-600">
                Voir nos projets et réalisations
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, translateY: -4 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/#contact"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-red-600"
            >
              <Mail className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Contact</h3>
              <p className="text-sm text-slate-600">
                Nous contacter pour un devis
              </p>
            </Link>
          </motion.div>
        </div>

        <div className="text-center">
          <p className="text-slate-600 mb-4">
            Besoin d'aide ? Explorez nos pages principales ou contactez-nous.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
