import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) 
  },
  { 
    path: 'hastalar', 
    loadComponent: () => import('./features/hasta/hasta-islemleri.component').then(m => m.HastaIslemleriComponent) 
  },
  { 
    path: 'poliklinik', 
    loadComponent: () => import('./features/poliklinik/poliklinik.component').then(m => m.PoliklinikComponent) 
  },
  { 
    path: 'laboratuvar', 
    loadComponent: () => import('./features/laboratuvar/laboratuvar.component').then(m => m.LaboratuvarComponent) 
  },
  { 
    path: 'radyoloji', 
    loadComponent: () => import('./features/radyoloji/radyoloji-ekrani.component').then(m => m.RadyolojiEkraniComponent) 
  },
  { 
    path: 'mali-isler', 
    loadComponent: () => import('./features/mali/mali-isler.component').then(m => m.MaliIslerComponent) 
  },
  { 
    path: 'insan-kaynaklari', 
    loadComponent: () => import('./features/ik/insan-kaynaklari.component').then(m => m.InsanKaynaklariComponent) 
  },
  { 
    path: 'stok-yonetimi', 
    loadComponent: () => import('./features/stok/stok-yonetimi.component').then(m => m.StokYonetimiComponent) 
  },
  { 
    path: 'raporlama', 
    loadComponent: () => import('./features/raporlama/raporlama.component').then(m => m.RaporlamaComponent) 
  },
  {
    path: 'randevular',
    loadComponent: () => import('./features/poliklinik/randevu-takip.component').then(m => m.RandevuTakipComponent)
  },
  {
    path: 'doktor-randevu',
    loadComponent: () => import('./features/poliklinik/doktor-randevu.component').then(m => m.DoktorRandevuComponent)
  },
  {
    path: 'doktor-ekrani',
    loadComponent: () => import('./features/poliklinik/doktor-ekrani.component').then(m => m.DoktorEkraniComponent)
  },
  {
    path: 'laborant-ekrani',
    loadComponent: () => import('./features/laboratuvar/laborant-ekrani.component').then(m => m.LaborantEkraniComponent)
  },
  {
    path: 'muhasebe-ekrani',
    loadComponent: () => import('./features/faturalama/muhasebe-ekrani.component').then(m => m.MuhasebeEkraniComponent)
  }
];
