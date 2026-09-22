'use strict';

var SITES     = ['Audi Hœnheim','Audi Obernai','SEAT Hœnheim','SEAT Illkirch','SKODA Hœnheim','SKODA Obernai','VW Bischheim','VW Illkirch','VW Obernai'];
var KVPS_MAP  = {'Audi Hœnheim':'02155','Audi Obernai':'02486','SEAT Hœnheim':'63930','SEAT Illkirch':'02153','SKODA Hœnheim':'02376','SKODA Obernai':'02485','VW Bischheim':'02154','VW Illkirch':'02153','VW Obernai':'02485'};
// ╔═══════════════════════════════════════════════════════════════╗
// ║  MOT DE PASSE POUR VIDER L'HISTORIQUE                          ║
// ║  Pour le changer : remplacez la valeur entre apostrophes       ║
// ║  ci-dessous, puis ré-uploadez js/app.js sur GitHub.            ║
// ╚═══════════════════════════════════════════════════════════════╝
var MOT_DE_PASSE = 'Garantie2026';

// ═══════════════════════════════════════════════════
// LISTE BLANCHE TeamGarantie
// Ajoutez ici les emails qui ont accès TeamGarantie
// ═══════════════════════════════════════════════════
var TEAM_EMAILS = [
  'omar.ruiz@geauto.fr',
  'teamgarantie@geauto.fr',
  'tahir.arifi@geauto.fr',
  'nicolas.pfeiffer@geauto.fr',
  'celine.romburg@geauto.fr',
  'marion.binaux@geauto.fr',
  // 'prenom.nom@geauto.fr',  // ← ajoutez d'autres membres ici
];

function isTeamEmail(email) {
  if (!email) return false;
  var e = email.toLowerCase().trim();
  for (var i = 0; i < TEAM_EMAILS.length; i++) {
    if (TEAM_EMAILS[i].toLowerCase() === e) return true;
  }
  return false;
}
var WEB3_KEY     = '7bf5b927-e39f-4fc1-9f60-642e4741e445';

// ═══════════════════════════════════════════════════════════
// VÉRIFICATIONS KULANZ PAR MARQUE
// ═══════════════════════════════════════════════════════════
var SITE_BRAND = {
  'Audi Hœnheim': 'Audi',
  'Audi Obernai':      'Audi',
  'SEAT Hœnheim': 'SEAT',
  'SEAT Illkirch':     'SEAT',
  'SKODA Hœnheim':'SKODA',
  'SKODA Obernai':     'SKODA',
  'VW Bischheim':      'VW',
  'VW Illkirch':       'VW',
  'VW Obernai':        'VW'
};

var KULANZ_BY_BRAND = {
  'VW': [
    {name:'tpi',             label:"Y a-t-il une TPI ?",                                              nok:null, info:"TPI manquante"},
    {name:'opteven',         label:"Garantie OPTEVEN visible dans ELSA ?",                            nok:'OUI', info:'Une garantie OPTEVEN est visible dans ELSA : la prise en charge OPTEVEN prime, la KULANZ ne peut pas être appliquée.'},
    {name:'tuning',          label:"Code tuning dans SAGA ?",                                         nok:'OUI', info:"Code tuning détecté → NOK"},
    {name:'piece_usure',     label:"La pièce concernée est une pièce d'usure ?",       nok:'OUI', info:"Pièce d'usure non couverte"},
    {name:'piece_entretien', label:"La pièce concernée est liée à l'entretien ?", nok:null},
    {name:'preconisations',  label:"Les préconisations constructeur pour les entretiens sont toutes respectées ?", nok:'NON', info:"Préconisations non respectées"},
    {name:'dernier_entretien',label:"Le dernier entretien est-il présent ?",                     nok:'NON', info:"Dernier entretien manquant"},
    {name:'vendu_client',    label:"Si non, est-il vendu au client et réalisé en même temps que la réparation ?", nok:null},
    {name:'lien_entretien',  label:"Un lien peut être établi entre la cause du dommage et l'entretien ?", nok:'OUI', info:"Lien dommage/entretien détecté"}
  ],
  'Audi': [
    {name:'tpi',             label:"Y a-t-il une TPI ?",                                              nok:null, info:"TPI manquante"},
    {name:'opteven',         label:"Garantie OPTEVEN visible dans ELSA ?",                            nok:'OUI', info:'Une garantie OPTEVEN est visible dans ELSA : la prise en charge OPTEVEN prime, la KULANZ ne peut pas être appliquée.'},
    {name:'tuning',          label:"Code tuning dans SAGA ?",                                         nok:'OUI', info:"Code tuning détecté → NOK"},
    {name:'piece_usure',     label:"La pièce concernée est une pièce d'usure ?",       nok:'OUI', info:"Pièce d'usure non couverte"},
    {name:'piece_entretien', label:"La pièce concernée est liée à l'entretien ?", nok:null},
    {name:'preconisations',  label:"Les préconisations constructeur pour les entretiens sont toutes respectées ?", nok:'NON', info:"Préconisations non respectées"},
    {name:'dernier_entretien_audi',label:"Le dernier entretien a été fait chez Audi ?",    nok:'NON', info:"Entretien non réalisé chez Audi"},
    {name:'vendu_client',    label:"Si non, est-il vendu au client et réalisé en même temps que la réparation ?", nok:null},
    {name:'lien_entretien',  label:"Un lien peut être établi entre la cause du dommage et l'entretien ?", nok:'OUI', info:"Lien dommage/entretien détecté"}
  ],
  'SEAT': [
    {name:'tpi',             label:"Y a-t-il une TPI ?",                                              nok:null, info:"TPI manquante"},
    {name:'opteven',         label:"Garantie OPTEVEN visible dans ELSA ?",                            nok:'OUI', info:'Une garantie OPTEVEN est visible dans ELSA : la prise en charge OPTEVEN prime, la KULANZ ne peut pas être appliquée.'},
    {name:'tuning',          label:"Code tuning dans SAGA ?",                                         nok:'OUI', info:"Code tuning détecté → NOK"},
    {name:'piece_usure',     label:"La pièce concernée est une pièce d'usure ?",       nok:'OUI', info:"Pièce d'usure non couverte"},
    {name:'piece_entretien', label:"La pièce concernée est liée à l'entretien ?", nok:null},
    {name:'preconisations',  label:"Les préconisations constructeur pour les entretiens sont toutes respectées ?", nok:'NON', info:"Préconisations non respectées"},
    {name:'dernier_entretien',label:"Le dernier entretien est-il présent ?",                     nok:'NON', info:"Dernier entretien manquant"},
    {name:'vendu_client',    label:"Si non, est-il vendu au client et réalisé en même temps que la réparation ?", nok:null},
    {name:'lien_entretien',  label:"Un lien peut être établi entre la cause du dommage et l'entretien ?", nok:'OUI', info:"Lien dommage/entretien détecté"}
  ],
  'SKODA': [
    {name:'tpi',             label:"Y a-t-il une TPI ?",                                              nok:null, info:"TPI manquante"},
    {name:'opteven',         label:"Garantie OPTEVEN visible dans ELSA ?",                            nok:'OUI', info:'Une garantie OPTEVEN est visible dans ELSA : la prise en charge OPTEVEN prime, la KULANZ ne peut pas être appliquée.'},
    {name:'tuning',          label:"Code tuning dans SAGA ?",                                         nok:'OUI', info:"Code tuning détecté → NOK"},
    {name:'piece_usure',     label:"La pièce concernée est une pièce d'usure ?",       nok:'OUI', info:"Pièce d'usure non couverte"},
    {name:'piece_entretien', label:"La pièce concernée est liée à l'entretien ?", nok:null},
    {name:'preconisations',  label:"Tous les entretiens ont été réalisés en respectant les préconisations du constructeur (Km/durée) ? (Aucun entretien n'est à faire)", nok:'NON', info:"Préconisations non respectées"},
    {name:'entretien_moment',label:"Un entretien est-il à faire au moment de la réparation ? (Échéance non dépassée)", nok:null, has_nc:true},
    {name:'vendu_client',    label:"Si oui, est-il vendu au client et réalisé en même temps que la réparation ?", nok:null},
    {name:'justificatifs',   label:"Disposez-vous des justificatifs des 2 derniers entretiens ? (Hors entretien fait au moment de la réparation)", nok:'NON', info:"Justificatifs manquants"},
    {name:'justif_preco',    label:"Si oui, ont-ils été réalisés en respectant les préconisations constructeur ?", nok:'NON', info:"Préconisations non respectées sur les 2 derniers entretiens"},
    {name:'lien_entretien',  label:"Un lien peut être établi entre la cause du dommage et l'entretien ?", nok:'OUI', info:"Lien dommage/entretien détecté"}
  ]
};


// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// ÉTAT GLOBAL
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
var G = {
  role: '',        // 'usager' | 'team'
  site: '',        // site usager
  demandes: [],
  activeId: null,  // demande en cours de validation
  kulanzData: {}, // copie kulanz pour CCR
  fbListening: false,
  demandeType: 'K', // K = Kulanz, C = CCR
  editingId: null,  // id de la demande rouverte pour modification (null = nouvelle demande)
  histoType: 'Kulanz', // onglet actif de l'historique : 'Kulanz' | 'CCR'
  histoSort: { key: 'date', dir: 'desc' }, // tri actif de l'historique
  histoMode: 'pending', // 'pending' = file à traiter | 'treated' = archive
  editOnly: false // true = modification d'une demande sans envoi de mail
};

// ═══════════════════════════════════════════════════════════
// STATUTS — définition centralisée (libellé, icône, classe badge)
// Pour ajouter/modifier un statut, ne toucher QU'ICI.
// ═══════════════════════════════════════════════════════════
var STATUTS = {
  'En attente':                  { icon: '🟡', badge: 'b-wait', traite: false },
  'Complément requis':           { icon: '🔄', badge: 'b-comp', traite: false },
  'Traitée':                     { icon: '✅', badge: 'b-ok',   traite: true },
  'Traitée sans participation':  { icon: '❌', badge: 'b-no',   traite: true },
  // Workflow CCR
  'Demande envoyée':                 { icon: '📨', badge: 'b-sent', traite: false, ccr: true },
  'Documentation reçue':             { icon: '📄', badge: 'b-doc',  traite: false, ccr: true },
  'Documents imprimés - à traiter':  { icon: '🖨️', badge: 'b-print',traite: false, ccr: true },
  'Traitée (en cours CCR)':          { icon: '⏳', badge: 'b-vgf',  traite: false, ccr: true },
  'Validée CCR':                     { icon: '✅', badge: 'b-ok',   traite: true,  ccr: true },
  'Traité sans participation':       { icon: '❌', badge: 'b-no',   traite: true,  ccr: true }
};
// Ordre des étapes CCR (pour les boutons "étape suivante")
var CCR_WORKFLOW = ['Demande envoyée','Documentation reçue','Documents imprimés - à traiter','Traitée (en cours CCR)'];
var CCR_FINAUX = ['Validée CCR','Traité sans participation'];
// Statuts CCR qui déclenchent l'ouverture du mailto (finaux + demande de complément)
var CCR_MAIL = ['Validée CCR','Traité sans participation','Complément requis'];
var STATUTS_ORDRE_CCR = CCR_WORKFLOW.concat(CCR_FINAUX).concat(['Complément requis']);
// Responsables (impression / traitement CCR)
var RESPONSABLES = ['', 'Nico', 'Marion', 'Céline', 'Tahir', 'Omar'];
var STATUTS_ORDRE = ['En attente','Traitée','Traitée sans participation','Complément requis'];
function statutInfo(s) { return STATUTS[s] || STATUTS['En attente']; }
function statutEstTraite(s) { return !!(STATUTS[s] && STATUTS[s].traite); }

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// FIREBASE — init différée dans try/catch
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
var db = null;
var demandesRef = null;

function initFirebase() {
  if (typeof firebase === 'undefined') {
    console.warn('Firebase non chargé');
    return;
  }
  try {
    var cfg = {
      apiKey:"AIzaSyDUf2WrUO6Lo4I2Dj9hLcEW70tZMHyx3sw",
      authDomain:"kulanz-autho.firebaseapp.com",
      databaseURL:"https://kulanz-autho-default-rtdb.europe-west1.firebasedatabase.app",
      projectId:"kulanz-autho",
      storageBucket:"kulanz-autho.firebasestorage.app",
      messagingSenderId:"852790118871",
      appId:"1:852790118871:web:72904a41268839eba12392"
    };
    if (!firebase.apps.length) firebase.initializeApp(cfg);
    db = firebase.database();
    demandesRef = db.ref('demandes');
    db.ref('.info/connected').on('value', function(snap) {
      var connected = !!snap.val();
      var dot = ge('db-dot');
      if (dot) dot.style.background = connected ? '#27ae60' : '#e74c3c';
      // N'afficher le bandeau hors-ligne qu'après une vraie perte (pas au tout premier chargement)
      if (connected) setOffline(false);
    });
    return true;
  } catch(e) {
    console.error('Firebase init failed:', e);
    toast('⚠ Mode hors ligne — Firebase indisponible');
    return false;
  }
}

function startListener() {
  if (G.fbListening || !demandesRef || !db) return;
  G.fbListening = true;
  demandesRef.on('value', function(snap) {
    G.demandes = [];
    snap.forEach(function(c) { G.demandes.push(c.val()); });
    G.demandes.sort(function(a,b) { return String(b.id) > String(a.id) ? 1 : -1; });
    try { localStorage.setItem('gea_demandes', JSON.stringify(G.demandes)); } catch(e) {}
    setOffline(false); // lecture OK → en ligne
    renderHisto();
    if (G.role === 'team') renderDash();
  }, function(err) {
    console.warn('Firebase offline:', err);
    setOffline(true); // lecture impossible → bandeau hors ligne
    try {
      var s = localStorage.getItem('gea_demandes');
      G.demandes = s ? JSON.parse(s) : [];
    } catch(e) { G.demandes = []; }
    renderHisto();
  });
}

// Affiche/masque le bandeau "Mode hors ligne"
function setOffline(isOffline) {
  var bn = ge('offline-banner');
  if (bn) bn.style.display = isOffline ? 'block' : 'none';
}

// Tentative de reconnexion (relance l'écoute Firebase)
function reconnecterFirebase() {
  toast('Reconnexion en cours…');
  try {
    G.fbListening = false;
    if (!db || !demandesRef) initFirebase();
    startListener();
  } catch(e) { console.warn('Reconnexion:', e); }
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// UTILITAIRES
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function ge(id) { return document.getElementById(id); }


function ouvrirOutlookCCR() {
  var ml = window._lastMailto || '';
  if (!ml) { toast('⚠ Aucun mail préparé.'); return; }
  try {
    var _a = document.createElement('a');
    _a.href = ml;
    _a.style.display = 'none';
    document.body.appendChild(_a);
    _a.click();
    setTimeout(function(){ document.body.removeChild(_a); }, 500);
  } catch(e) {
    window.location.href = ml;
  }
}

function copierObjetMail() {
  var subj = window._ccrSubject || '';
  try {
    var t = document.createElement('textarea');
    t.value = subj;
    t.style.position = 'fixed';
    t.style.opacity  = '0';
    document.body.appendChild(t);
    t.focus(); t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    toast('✔ Objet copié !');
  } catch(e) { alert('Objet : ' + subj); }
}

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function decodeLabel(s) {
  return String(s||'').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');
}
function gv(name) {
  var el = document.querySelector('#mainForm [name="'+name+'"]');
  return el ? el.value.trim() : '';
}
function sv(name, val) {
  var el = document.querySelector('#mainForm [name="'+name+'"]');
  if (el && val !== undefined) el.value = val;
}
function gr(name) {
  var el = document.querySelector('#mainForm [name="'+name+'"]:checked');
  return el ? el.value : '';
}
function toast(msg) {
  var t = ge('toast');
  if (!t) { console.log('[toast]', msg); return; }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { if(ge('toast')) ge('toast').classList.remove('show'); }, 3200);
}
function isValidVIN(v) {
  if (!v || v.length !== 17) return false;
  if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(v)) return false;
  if (/^(.)\1{16}$/.test(v)) return false;
  return true;
}
function vinHint(v) {
  if (!v) return '0 / 17 caractères';
  if (/[IOQ]/i.test(v)) return v.length+' / 17 — ⚠ I, O, Q interdits';
  if (v.length < 17) return v.length+' / 17 — incomplet';
  if (isValidVIN(v)) return '✔ Châssis valide';
  return '⚠ Format invalide';
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// LOGIN
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// showStep1() / showStep2() sont definis dans index.html (gestion robuste des 3 etapes du login).
function openPwdModal() {
  ge('pwd-modal').classList.add('open');
  setTimeout(function() { ge('pwd-input').focus(); }, 100);
}
function closePwdModal() {
  ge('pwd-modal').classList.remove('open');
  ge('pwd-input').value = '';
  ge('pwd-error').style.display = 'none';
}
function submitPwd() {
  if (ge('pwd-input').value !== MOT_DE_PASSE) {
    ge('pwd-error').style.display = 'block';
    ge('pwd-input').focus();
    return;
  }
  closePwdModal();
  G.role = 'team';
  G.site = '';
  ouvrirApp();
}
function loginUsager(site) {
  G.role = 'usager';
  G.site = site;
  ouvrirApp();
}


// ══════════════════════════════════════════════════════
// FIREBASE AUTH — Option 3 (e-mail @geauto.fr)
// ══════════════════════════════════════════════════════

function focusAuthPwd() {
  var p = ge('auth-pwd'); if (p) p.focus();
}

// connecterUsager() est defini dans index.html (flux de connexion Firebase a jour).

function deconnecterUsager() {
  if (firebase && firebase.auth) {
    firebase.auth().signOut().catch(function(e){ console.warn(e); });
  }
}

function ouvrirApp() {
  ge('login-page').classList.add('hidden');
  // Afficher le header et la zone utilisateur
  var mh = ge('main-header') || document.querySelector('header');
  if (mh) mh.style.display = '';
  ge('h-user').style.display = 'flex';
  if (ge('tab-demandes')) ge('tab-demandes').style.display = 'block';
  ge('tab-histo').style.display = 'block';

  if (G.role === 'team') {
    ge('h-role').textContent = '🔐 TeamGarantie';
    var _bd = ge('btn-debloquer'); if (_bd) _bd.style.display = '';
    // TeamGarantie: accès total — formulaire + historique + tous les sites
    ge('site-bar').style.display = 'block'; // Visible pour choisir le site
    ge('dash-wrap').classList.add('on');
    ge('h-site-name').textContent = 'Tous les sites';
    // Permettre la sélection de site dans le formulaire
    var fsite = ge('f-site');
    if (fsite) { fsite.disabled = false; fsite.readOnly = false; }
    var fsdisplay = ge('site-display');
    if (fsdisplay) { fsdisplay.disabled = false; fsdisplay.readOnly = false; }
    ge('site-field').style.display = 'flex';
    renderKulanzForm('VW Bischheim'); // défaut VW pour TeamGarantie
  } else {
    ge('h-role').textContent = '👤 ' + G.site;
    var _bd2 = ge('btn-debloquer'); if (_bd2) _bd2.style.display = 'none';
    ge('site-bar').style.display = 'none';
    ge('h-site-name').textContent = G.site;
    // Remplir les champs site dans le formulaire
    var fs = ge('f-site'); if (fs) { fs.value = G.site; fs.readOnly = true; }
    var sd = ge('site-display'); if (sd) { sd.value = G.site; sd.readOnly = true; }
    ge('site-field').style.display = 'flex';
    // KVPS
    var kv = ge('kvps'); if (kv) { kv.value = KVPS_MAP[G.site] || ''; kv.readOnly = true; }
    var kvn = document.querySelector('[name="kvps"]'); if (kvn) { kvn.value = KVPS_MAP[G.site] || ''; kvn.readOnly = true; }
    renderKulanzForm(G.site);
    [].forEach.call(document.querySelectorAll('.s-btn'), function(b) {
      b.classList.toggle('active', b.textContent.trim() === G.site);
    });
    var kvpsEl = ge('kvps');
    if (kvpsEl) { kvpsEl.value = KVPS_MAP[G.site] || ''; kvpsEl.readOnly = true; }
    // Aussi remplir via le champ name= (compatibilité)
    var kvpsName = document.querySelector('[name="kvps"]');
    if (kvpsName) { kvpsName.value = KVPS_MAP[G.site] || ''; kvpsName.readOnly = true; }
    [].forEach.call(document.querySelectorAll('.s-btn'), function(b) {
      b.classList.toggle('active', b.textContent.trim() === G.site);
    });
  }

  enableAllDropdowns();
  // Retirer la feuille anti-flash et remettre les pages visibles
  var afStyle = document.querySelector('style[data-antiflash]');
  if (afStyle) afStyle.remove();
  // Forcer display sur les éléments principaux
  var pf = ge('page-form');  if (pf) { pf.style.cssText = ''; }
  var ph = ge('page-histo'); if (ph) { ph.style.cssText = ''; }
  var so = ge('sp-overlay'); if (so) { so.style.cssText = ''; }
  initFirebase();
  startListener();
  restoreDraft();
}

// Permet à l'utilisateur CONNECTÉ de changer lui-même son mot de passe.
function changerMonMdp() {
  var user = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
  if (!user) { toast('⚠ Vous devez être connecté.'); return; }

  var p1 = prompt('Nouveau mot de passe (6 caractères minimum) :');
  if (p1 === null) return;                 // annulé
  p1 = (p1 || '').trim();
  if (p1.length < 6) { alert('Le mot de passe doit contenir au moins 6 caractères.'); return; }
  var p2 = prompt('Confirmez le nouveau mot de passe :');
  if (p2 === null) return;
  if (p1 !== (p2 || '').trim()) { alert('Les deux mots de passe ne correspondent pas.'); return; }

  user.updatePassword(p1)
    .then(function(){ alert('✅ Mot de passe mis à jour avec succès.'); })
    .catch(function(e){
      if (e && e.code === 'auth/requires-recent-login') {
        alert('Pour des raisons de sécurité, veuillez vous déconnecter puis vous reconnecter, et réessayer immédiatement après.');
      } else if (e && e.code === 'auth/weak-password') {
        alert('Mot de passe trop faible (6 caractères minimum).');
      } else {
        alert('⚠️ Erreur : ' + (e && e.message ? e.message : 'réessayez.'));
      }
    });
}

function deconnecter() {
  deconnecterUsager();
  if (typeof setOffline === 'function') setOffline(false);
  G.role = ''; G.site = ''; G.fbListening = false;
  var mh2 = ge('main-header') || document.querySelector('header');
  if (mh2) mh2.style.display = 'none';
  // Recréer l'anti-flash pour la prochaine connexion
  if (!document.querySelector('style[data-antiflash]')) {
    var s=document.createElement('style');
    s.setAttribute('data-antiflash','1');
    s.textContent='#page-form,#page-histo,#sp-overlay,#side-panel,#vider-modal,#toast,#success-overlay,header{display:none!important}'+'#login-page{display:flex!important;align-items:center!important;justify-content:center!important;overflow-y:auto!important}';
    document.head.appendChild(s);
  }
  ge('login-page').classList.remove('hidden');
  ge('lp-step1').style.display = 'block';
  ge('lp-step2').style.display = 'none';
  if (ge('lp-step3')) ge('lp-step3').style.display = 'none';
  ge('h-user').style.display = 'none';
  if (ge('tab-demandes')) ge('tab-demandes').style.display = 'none';
  ge('tab-histo').style.display = 'none';
  ge('dash-wrap').classList.remove('on');
  ge('h-alert').classList.remove('on');
  ge('site-bar').style.display = 'none';
  ge('site-field').style.display = 'none';
  ge('type-bar').style.display = 'flex';
  ge('kvps').readOnly = false;
  [].forEach.call(document.querySelectorAll('.s-btn'), function(b) { b.classList.remove('active'); });
  ge('f-site').value = '';
  ge('h-site-name').textContent = '—';
  ssReset('dom'); ssReset('ava');
  showPage('form', ge('tab-form'));
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// NAVIGATION
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function showPage(page, tabEl) {
  [].forEach.call(document.querySelectorAll('.page'), function(p) { p.classList.remove('active'); });
  [].forEach.call(document.querySelectorAll('.nav-tab'), function(t) { t.classList.remove('active'); });
  // 'demandes' et 'histo' partagent la même page (page-histo) avec un mode différent
  var realPage = (page === 'demandes') ? 'histo' : page;
  if (page === 'demandes') G.histoMode = 'pending';
  else if (page === 'histo') G.histoMode = 'treated';
  ge('page-'+realPage).classList.add('active');
  if (tabEl) tabEl.classList.add('active');
  ge('type-bar').style.display = (page === 'form') ? 'flex' : 'none';
  if (realPage === 'histo') renderHisto();
}

function selectSite(btn, name) {
  [].forEach.call(document.querySelectorAll('.s-btn'), function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  var fsite = ge('f-site'); if(fsite) fsite.value = name;
  var hn = ge('h-site-name'); if(hn) hn.textContent = name || 'Tous les sites';
  // Remplir le champ Site visible du formulaire
  var sd = ge('site-display'); if (sd) sd.value = name || '';
  // Remplir le KVPS automatiquement à partir du site (pour TeamGarantie comme pour l'usager)
  var kvpsEl2 = ge('kvps');
  if (kvpsEl2) kvpsEl2.value = name ? (KVPS_MAP[name] || '') : '';
  var kvpsName = document.querySelector('[name="kvps"]');
  if (kvpsName && kvpsName !== kvpsEl2) kvpsName.value = name ? (KVPS_MAP[name] || '') : '';
  // Afficher le champ Site s'il était masqué
  var sf = ge('site-field'); if (sf) sf.style.display = 'flex';
  renderKulanzForm(name);
  if (typeof updateFormProgress === 'function') updateFormProgress();
}

function setType(t) {
  G.demandeType = t;
  var isK = (t === 'K');
  if (!isK) saveKulanz();
  else {
    // Reset champs CCR
    [].forEach.call(document.querySelectorAll('[name="pieces[]"]'), function(cb) { cb.checked = false; });
    [].forEach.call(document.querySelectorAll('[name="kulanz_done"],[name="cig"],[name="elsa_dispo"]'), function(r) { r.checked = false; });
    var ct = ge('cig-taux'); if (ct) { ct.value = ''; ct.disabled = true; }
    var iqEl = ge('iq-num'); if (iqEl) { iqEl.value = ''; iqEl.className=''; }
    var iqH = ge('iq-hint'); if (iqH) { iqH.textContent = '0 / 9 chiffres'; iqH.className='hint'; }
    var fw = ge('factures-wrap'); if (fw) fw.style.display = 'none';
  }
  ge('btn-k').classList.toggle('active', isK);
  // Afficher/cacher la case engagement CCR
  var engWrap = ge('ccr-engagement-wrap');
  if (engWrap) engWrap.style.display = !isK ? 'block' : 'none';
  // Réinitialiser la case si on change de type
  var chkE = ge('chk-engagement');
  if (chkE && isK) chkE.checked = false;
  if (isK) {
    var curSite = ge('f-site') ? ge('f-site').value : '';
    if (curSite) renderKulanzForm(curSite);
    setTimeout(checkKulanzNok, 50);
  }
  ge('btn-c').classList.toggle('active', !isK);
  ge('f-type').value = isK ? 'Kulanz' : 'CCR';
  [].forEach.call(document.querySelectorAll('.k-section'), function(el) { el.style.display = isK ? 'block' : 'none'; });
  [].forEach.call(document.querySelectorAll('.c-section'), function(el) { el.style.display = !isK ? 'block' : 'none'; });
  ge('comm-num').textContent = isK ? '4' : '6';
  ge('btn-copy-kulanz').style.display = isK ? 'flex' : 'none';
  if (typeof updateFormProgress === 'function') updateFormProgress();
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// SEARCHABLE SELECT
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
var ssState = { dom: null, ava: null, desig: null, rub: null };

function ssData(key) {
  if (key === 'ava') return CODES_AVA;

  // Recherche unifiée "pièce ou code" : chaque entrée = une paire rubrique|désignation,
  // avec son code, sa rubrique et sa catégorie déduite, pour tout remplir d'un coup.
  if (key === 'piece') {
    if (window.__pieceIndex) return window.__pieceIndex;
    var idx = [];
    var rubToCat = {};
    Object.keys(CAT_RUBS).forEach(function(c){ CAT_RUBS[c].forEach(function(r){ rubToCat[r] = c; }); });
    Object.keys(RUB_LABEL_CODES).forEach(function(k){
      var parts = k.split('|||');
      var rub = parts[0], desig = parts[1];
      var codes = RUB_LABEL_CODES[k] || [];
      var cat = rubToCat[rub] || '';
      // code = le 1er code ; label affiché = désignation + contexte rubrique
      var code = codes.length ? codes[0] : '';
      idx.push({
        code: code || desig,        // ce qui s'affiche en gras à gauche
        label: desig,               // libellé principal
        _desig: desig, _rub: rub, _cat: cat, _codes: codes,
        // texte de recherche : désignation + rubrique + tous les codes
        _search: (desig + ' ' + rub + ' ' + codes.join(' ')).toLowerCase()
      });
    });
    window.__pieceIndex = idx;
    return idx;
  }

  var cat    = ge('dom-cat')   ? ge('dom-cat').value   : '';
  var rubVal = ge('rub-val')   ? ge('rub-val').value   : '';
  var desigV = ge('desig-val') ? ge('desig-val').value : '';

  if (key === 'rub') {
    // Filtrer par catégorie si définie, sinon toutes les rubriques
    var rubs = (cat && CAT_RUBS[cat]) ? CAT_RUBS[cat] : Object.keys(RUB_LABELS);
    return rubs.map(function(r){ return {code:r, label:r}; });
  }

  if (key === 'desig') {
    var labels = [];
    if (rubVal && RUB_LABELS[rubVal]) {
      // Rubrique sélectionnée → ses désignations
      labels = RUB_LABELS[rubVal];
    } else if (cat && CAT_RUBS[cat]) {
      // Catégorie sélectionnée → toutes désignations de ses rubriques
      var seen = {};
      CAT_RUBS[cat].forEach(function(rub) {
        (RUB_LABELS[rub] || []).forEach(function(l) {
          if (!seen[l]) { seen[l] = true; labels.push(l); }
        });
      });
    } else {
      // Aucun filtre → toutes les désignations
      var seen2 = {};
      Object.keys(RUB_LABELS).forEach(function(rub) {
        (RUB_LABELS[rub] || []).forEach(function(l) {
          if (!seen2[l]) { seen2[l] = true; labels.push(l); }
        });
      });
    }
    return labels.map(function(l){ return {code:l, label:l}; });
  }

  if (key === 'dom') {
    // Codes filtrés selon rub + desig disponibles
    if (rubVal && desigV) {
      var k = rubVal + '|||' + desigV;
      var codes = RUB_LABEL_CODES[k] || [];
      // Fallback si la clé exacte n'existe pas
      if (!codes.length) {
        Object.keys(RUB_LABEL_CODES).forEach(function(k2) {
          if (k2.split('|||')[1] === desigV) codes = codes.concat(RUB_LABEL_CODES[k2]);
        });
      }
      return codes.filter(function(c,i){return codes.indexOf(c)===i;})
                  .map(function(c){ return {code:c, label:desigV}; });
    }
    if (desigV) {
      var found = [];
      Object.keys(RUB_LABEL_CODES).forEach(function(k3) {
        if (k3.split('|||')[1] === desigV) found = found.concat(RUB_LABEL_CODES[k3]);
      });
      return found.filter(function(c,i){return found.indexOf(c)===i;})
                  .map(function(c){ return {code:c, label:desigV}; });
    }
    // Scope: par rubrique active, catégorie active, ou tout
    var scope = rubVal ? [rubVal]
              : (cat && CAT_RUBS[cat] ? CAT_RUBS[cat] : Object.keys(RUB_LABELS));
    var all = []; var seenC = {};
    scope.forEach(function(rub) {
      Object.keys(RUB_LABEL_CODES).forEach(function(k4) {
        if (k4.split('|||')[0] === rub) {
          var lbl = k4.split('|||')[1];
          RUB_LABEL_CODES[k4].forEach(function(c) {
            if (!seenC[c]) { seenC[c] = true; all.push({code:c, label:lbl}); }
          });
        }
      });
    });
    all.sort(function(a,b){ return parseInt(a.code) - parseInt(b.code); });
    return all;
  }
  return [];
}



function ssClear(key) {
  ssState[key] = null;
  var valEl = ge(key + '-val');
  if (valEl) { valEl.value = ''; if (valEl.dataset) valEl.dataset.manual = ''; }
  var lblEl = ge(key + '-lbl'); if (lblEl) lblEl.value = '';
  var btn   = ge('ss-' + key + '-btn'); if (btn) btn.classList.remove('filled');
  var hint  = ge('ss-' + key + '-hint'); if (hint){ hint.textContent=''; hint.className='hint'; }
  var txt   = ge('ss-' + key + '-txt');
  var ph = {
    rub:   'Rechercher une rubrique…',
    desig: 'Rechercher une désignation…',
    dom:   'Rechercher par code ou libéllé…',
    ava:   'Sélectionner un code avarie…',
    piece: 'Tapez le nom de la pièce ou le code…'
  };
  if (txt) txt.textContent = ph[key] || 'Sélectionner…';
  // Effacer la recherche unifiée réinitialise tout le bloc dommage
  if (key === 'piece') {
    var ci=ge('dom-cat'); if(ci) ci.value='';
    [].forEach.call(document.querySelectorAll('.cat-btn'), function(b){ b.classList.remove('active'); });
    var ch=ge('cat-hint'); if(ch){ch.textContent='';ch.className='hint';}
    ['rub','desig','dom'].forEach(function(k){
      ssState[k]=null;
      var v=ge(k+'-val'); if(v) v.value='';
      var l=ge(k+'-lbl'); if(l) l.value='';
      var b=ge('ss-'+k+'-btn'); if(b){ b.classList.remove('filled'); var t=b.querySelector('.ss-txt'); if(t) t.textContent=ph[k]||'Sélectionner…'; }
      var h=ge('ss-'+k+'-hint'); if(h){h.textContent='';h.className='hint';}
    });
    var ph2=ge('ss-piece-hint'); if(ph2){ph2.textContent='Choisissez la pièce : la catégorie, la rubrique et le code se remplissent automatiquement.';ph2.className='hint';}
    if (typeof updatePieceRecap==='function') updatePieceRecap();
    ssClose(); saveDraft(); return;
  }
  // Propager le reset vers le bas
  if (key === 'rub') {
    var rv = ge('rub-val'); if (rv) rv.value = '';
    resetBelow('rub');
  } else if (key === 'desig') {
    resetBelow('desig');
  }
  ssClose();
  saveDraft();
}


function ssReset(key) {
  ssClear(key);
}
function ssResetDesig() {
  ssState['desig'] = null;
  var dv = ge('desig-val'); if(dv){dv.value='';dv.dataset.manual='';}
  var dBtn=ge('ss-desig-btn'); if(dBtn){dBtn.classList.remove('filled');
    var t=dBtn.querySelector('.ss-txt');
    if(t)t.textContent='🔍 Rechercher une désignation…';}
  var dHint=ge('ss-desig-hint'); if(dHint){dHint.textContent='';dHint.className='hint';}
  ssReset('dom');
  var domBtn=ge('ss-dom-btn'); if(domBtn){domBtn.classList.remove('filled');
    var t2=domBtn.querySelector('.ss-txt');
    if(t2)t2.textContent='🔍 Rechercher par code ou libéllé…';}
}

function ssSet(key, code, label) {
  if (!code) return;
  ssPick(key, code, label||'');
}

function ssToggle(key) {
  var drop = ge('ss-' + key + '-drop');
  var btn  = ge('ss-' + key + '-btn');
  if (!drop || !btn) return;
  var isOpen = drop.classList.contains('open');
  ssClose();
  if (!isOpen) {
    drop.classList.add('open');
    btn.classList.add('open');
    var inp = ge('ss-' + key + '-inp');
    ssRender(key, inp ? inp.value : '');
    if (inp) inp.focus();
  }
}


function ssClose() {
  ['dom','ava','desig','rub','piece'].forEach(function(k) {
    var d = ge('ss-'+k+'-drop');
    var b = ge('ss-'+k+'-btn');
    if (d) d.classList.remove('open');
    if (b) b.classList.remove('open');
  });
}

function ssPickFromEl(el) {
  var code  = el.getAttribute('data-code');
  var label = el.getAttribute('data-label');
  var key   = el.getAttribute('data-key');
  if (code && key) ssPick(key, code, label || '');
}

function ssRenderSoft(key) {
  var drop = ge('ss-'+key+'-drop');
  if (drop && drop.classList.contains('open')) {
    var inp = ge('ss-'+key+'-inp');
    ssRender(key, inp ? inp.value : '');
  }
}

function ssRender(key, query) {
  var items = ssData(key);
  var q = (query || '').toLowerCase().trim();
  var filtered;
  if (!q) {
    filtered = items;
  } else if (key === 'piece') {
    filtered = items.filter(function(it){ return it._search.indexOf(q) !== -1; });
  } else if (key === 'dom' || key === 'ava') {
    // Code: commence par | label: contient
    filtered = items.filter(function(it) {
      return it.code.toLowerCase().indexOf(q) !== -1
          || it.label.toLowerCase().indexOf(q) !== -1;
    });
  } else {
    filtered = items.filter(function(it) {
      return it.label.toLowerCase().indexOf(q) !== -1;
    });
  }
  var shown = filtered.slice(0, 200);
  var cnt = ge('ss-' + key + '-cnt');
  if (cnt) cnt.textContent = filtered.length + ' résultat' + (filtered.length !== 1 ? 's' : '')
    + (filtered.length > 200 ? ' — 200 affichés' : '');
  var opts = ge('ss-' + key + '-opts');
  if (!opts) return;
  if (!shown.length) { opts.innerHTML = '<div class="ss-empty">Aucun résultat</div>'; return; }
  var cur = ssState[key] ? ssState[key].code : '';

  if (key === 'piece') {
    opts.innerHTML = shown.map(function(it, i) {
      var realIdx = items.indexOf(it);
      var codeTxt = (it._codes && it._codes.length) ? it._codes.join(' / ') : '—';
      return '<div class="ss-opt" data-pieceidx="' + realIdx + '" onclick="piecePickFromEl(this)">'
        + '<span class="ss-code" style="font-size:13px;font-weight:700">' + esc(codeTxt) + '</span>'
        + '<span class="ss-lbl" style="margin-left:8px">' + esc(it._desig) + '</span>'
        + '<span class="ss-lbl" style="color:#999;font-size:11px;margin-left:8px">(' + esc(it._rub) + ')</span>'
        + '</div>';
    }).join('');
    return;
  }

  opts.innerHTML = shown.map(function(it) {
    var sel = (it.code === cur) ? ' sel' : '';
    var display;
    if (key === 'dom') {
      display = '<span class="ss-code" style="font-size:13px;font-weight:700">' + esc(it.code) + '</span>'
              + '<span class="ss-lbl" style="color:#888;font-size:11px;margin-left:8px">' + esc(it.label) + '</span>';
    } else if (key === 'ava') {
      display = '<span class="ss-code">' + esc(it.code) + '</span>'
              + '<span class="ss-lbl">' + esc(it.label) + '</span>';
    } else {
      display = '<span class="ss-lbl">' + esc(it.label) + '</span>';
    }
    return '<div class="ss-opt' + sel + '" data-code="' + esc(it.code)
         + '" data-label="' + esc(it.label) + '" data-key="' + key
         + '" onclick="ssPickFromEl(this)">' + display + '</div>';
  }).join('');
}

// === RECHERCHE UNIFIÉE "pièce ou code" ===
// Sélection depuis la liste : remplit catégorie + rubrique + désignation + code dommage d'un coup.
function piecePickFromEl(el) {
  var idx = parseInt(el.getAttribute('data-pieceidx'), 10);
  var items = ssData('piece');
  var it = items[idx];
  if (!it) return;
  piecePick(it);
}

function piecePick(it) {
  // Catégorie
  var ci = ge('dom-cat'); if (ci) ci.value = it._cat || '';
  [].forEach.call(document.querySelectorAll('.cat-btn'), function(b){
    b.classList.toggle('active', b.getAttribute('data-cat') === it._cat);
  });
  var ch = ge('cat-hint'); if (ch && it._cat) { ch.textContent = '✔ ' + it._cat; ch.className = 'hint ok'; }

  // Rubrique
  var rv = ge('rub-val'); if (rv) rv.value = it._rub || '';
  ssState['rub'] = { code: it._rub, label: it._rub };
  var rb = ge('ss-rub-btn'); if (rb) { rb.classList.add('filled'); var rt = rb.querySelector('.ss-txt'); if (rt) rt.textContent = it._rub; }
  var rh = ge('ss-rub-hint'); if (rh) { rh.textContent = '✔ ' + it._rub; rh.className = 'hint ok'; }

  // Désignation
  var dv = ge('desig-val'); if (dv) dv.value = it._desig || '';
  ssState['desig'] = { code: it._desig, label: it._desig };
  var dbt = ge('ss-desig-btn'); if (dbt) { dbt.classList.add('filled'); var dt = dbt.querySelector('.ss-txt'); if (dt) dt.textContent = it._desig; }
  var dh = ge('ss-desig-hint'); if (dh) { dh.textContent = '✔ ' + it._desig; dh.className = 'hint ok'; }

  // Code dommage : s'il y en a un seul -> auto ; sinon on prend le 1er mais on ouvre le mode avancé pour choisir
  var codes = it._codes || [];
  if (codes.length) {
    ssPick('dom', codes[0], it._desig);
  }

  // Champ unique : afficher la sélection + récap
  ssState['piece'] = { code: it._desig, label: it._desig };
  var pbtn = ge('ss-piece-btn'); if (pbtn) { pbtn.classList.add('filled'); var pt = pbtn.querySelector('.ss-txt'); if (pt) pt.textContent = (codes[0] ? codes[0] + ' — ' : '') + it._desig; }
  var pe = ge('ss-piece'); var pve = ge('ss-piece-btn'); if (pve) pve.classList.remove('field-error');
  var ph = ge('ss-piece-hint'); if (ph) { ph.textContent = codes.length > 1 ? ('Plusieurs codes possibles ('+codes.join(', ')+') — vérifiez en mode détaillé.') : '✔ Pièce et code sélectionnés'; ph.className = 'hint ok'; }

  updatePieceRecap();
  ssClose();
  saveDraft();
  if (typeof updateEntretienBanner === 'function') updateEntretienBanner();
  if (typeof checkKulanzNok === 'function') checkKulanzNok();
}

// Saisie manuelle d'une pièce hors liste
function piecemanualConfirm() {
  var inp = ge('ss-piece-manual');
  if (!inp || !inp.value.trim()) { toast('Saisissez une désignation.'); return; }
  var raw = inp.value.trim();
  var dv = ge('desig-val'); if (dv) { dv.value = raw; dv.dataset.manual = 'true'; }
  ssState['desig'] = { code: raw, label: raw };
  var dbt = ge('ss-desig-btn'); if (dbt) { dbt.classList.add('filled'); var dt = dbt.querySelector('.ss-txt'); if (dt) dt.textContent = raw; }
  ssState['piece'] = { code: raw, label: raw };
  var pbtn = ge('ss-piece-btn'); if (pbtn) { pbtn.classList.add('filled'); var pt = pbtn.querySelector('.ss-txt'); if (pt) pt.textContent = raw; }
  var ph = ge('ss-piece-hint'); if (ph) { ph.textContent = 'Saisie manuelle — complétez le code dommage en mode détaillé.'; ph.className = 'hint'; }
  // ouvrir le mode avancé pour saisir le code manuellement
  ouvrirAvance(true);
  updatePieceRecap();
  inp.value = ''; ssClose(); saveDraft();
  toast('✔ Désignation manuelle : ' + raw);
}

// Met à jour l'encadré récapitulatif lecture seule
function updatePieceRecap() {
  var recap = ge('dommage-recap'); if (!recap) return;
  var cat = ge('dom-cat') ? ge('dom-cat').value : '';
  var rub = ge('rub-val') ? ge('rub-val').value : '';
  var desig = ge('desig-val') ? ge('desig-val').value : '';
  var dom = ge('dom-val') ? ge('dom-val').value : '';
  if (cat || rub || desig || dom) {
    recap.style.display = 'block';
    var sc=ge('recap-cat'), sr=ge('recap-rub'), sd=ge('recap-desig'), sdo=ge('recap-dom');
    if(sc) sc.textContent = cat || '—';
    if(sr) sr.textContent = rub || '—';
    if(sd) sd.textContent = desig || '—';
    if(sdo) sdo.textContent = dom || '—';
  } else {
    recap.style.display = 'none';
  }
}

// Affiche/masque le mode détaillé (champs catégorie/rubrique/désignation/code)
function ouvrirAvance(show) {
  [].forEach.call(document.querySelectorAll('.avance-field'), function(el){ el.style.display = show ? '' : 'none'; });
  var b = ge('btn-avance');
  if (b) b.textContent = (show ? '▾' : '▸') + ' Mode détaillé (catégorie → rubrique → désignation, ou saisie manuelle)';
}
function toggleAvance() {
  var anyVisible = [].some.call(document.querySelectorAll('.avance-field'), function(el){ return el.style.display !== 'none'; });
  ouvrirAvance(!anyVisible);
}

function ssPick(key, code, label) {
  // retirer un éventuel surlignage d'erreur sur ce champ et son bouton
  var _ve = ge(key + '-val'); if (_ve && _ve.classList) _ve.classList.remove('field-error');
  var _be = ge('ss-' + key + '-btn'); if (_be && _be.classList) _be.classList.remove('field-error');
  var cleanLabel = decodeLabel(label);
  ssState[key] = { code: code, label: cleanLabel };
  var valEl = ge(key + '-val'); if (valEl) valEl.value = code;
  var lblEl = ge(key + '-lbl'); if (lblEl) lblEl.value = cleanLabel;
  var txt  = ge('ss-' + key + '-txt');
  var btn  = ge('ss-' + key + '-btn');
  if (btn) btn.classList.add('filled');
  var hint = ge('ss-' + key + '-hint');

  if (key === 'rub') {
    if (txt)  txt.textContent  = cleanLabel;
    if (hint) { hint.textContent = '✔ ' + cleanLabel; hint.className = 'hint ok'; }
    // Stocker dans rub-val AVANT le reset
    var rv = ge('rub-val'); if (rv) rv.value = cleanLabel;
    // Reset desig + dom (pas rub lui-même)
    resetBelow('rub');

  } else if (key === 'desig') {
    if (txt)  txt.textContent  = cleanLabel;
    if (hint) { hint.textContent = '✔ ' + cleanLabel; hint.className = 'hint ok'; }
    var dv = ge('desig-val'); if (dv) dv.value = cleanLabel;
    // Reset dom seulement
    resetBelow('desig');
    // Chercher les codes pour cette désignation
    var rubVal = ge('rub-val') ? ge('rub-val').value : '';
    var k      = rubVal + '|||' + cleanLabel;
    var codes  = RUB_LABEL_CODES[k] || [];
    if (!codes.length) {
      Object.keys(RUB_LABEL_CODES).forEach(function(k2) {
        if (k2.split('|||')[1] === cleanLabel) codes = codes.concat(RUB_LABEL_CODES[k2]);
      });
      codes = codes.filter(function(c, i){ return codes.indexOf(c) === i; });
    }
    var domBtn = ge('ss-dom-btn');
    if (domBtn) {
      domBtn.classList.remove('filled');
      var dt = domBtn.querySelector('.ss-txt');
      if (dt) dt.textContent = codes.length === 1
        ? codes[0]
        : '❖ ' + codes.length + ' code(s) disponible(s)';
    }
    // Auto-sélectionner si 1 seul code
    if (codes.length === 1) {
      setTimeout(function(){ ssPick('dom', codes[0], cleanLabel); }, 50);
    }

  } else if (key === 'dom') {
    if (txt)  txt.textContent = code;
    if (hint) { hint.textContent = '✔ ' + code; hint.className = 'hint ok'; }
    fillCascadeFromCode(code, cleanLabel);

  } else if (key === 'ava') {
    if (txt)  txt.textContent = code + ' — ' + cleanLabel;
    if (hint) { hint.textContent = '✔ ' + cleanLabel; hint.className = 'hint ok'; }

  } else {
    if (txt)  txt.textContent = code + ' — ' + cleanLabel;
    if (hint) { hint.textContent = '✔ ' + cleanLabel; hint.className = 'hint ok'; }
  }
  ssClose();
  saveDraft();
  if (typeof updatePieceRecap === 'function') updatePieceRecap();
}

function fillCascadeFromCode(code, desigLabel) {
  // Trouver rubrique + catégorie depuis le code
  var foundRub = '', foundDesig = desigLabel || '', foundCat = '';
  Object.keys(RUB_LABEL_CODES).forEach(function(k) {
    if (!foundRub && RUB_LABEL_CODES[k].indexOf(code) !== -1) {
      var parts  = k.split('|||');
      foundRub   = parts[0];
      foundDesig = desigLabel || parts[1];
    }
  });
  if (foundRub) {
    Object.keys(CAT_RUBS).forEach(function(cat) {
      if (!foundCat && CAT_RUBS[cat].indexOf(foundRub) !== -1) foundCat = cat;
    });
  }
  var curCat = ge('dom-cat') ? ge('dom-cat').value : '';

  // Remplir désignation si vide ou différente
  var dv = ge('desig-val');
  if (dv && foundDesig) {
    dv.value = foundDesig;
    ssState['desig'] = { code: foundDesig, label: foundDesig };
    var db = ge('ss-desig-btn');
    if (db) {
      db.classList.add('filled');
      var dt = db.querySelector('.ss-txt'); if (dt) dt.textContent = foundDesig;
    }
    var dh = ge('ss-desig-hint');
    if (dh) { dh.textContent = '✔ ' + foundDesig; dh.className = 'hint ok'; }
  }
  // Remplir rubrique si vide
  var rv = ge('rub-val');
  if (rv && foundRub && !rv.value) {
    rv.value = foundRub;
    ssState['rub'] = { code: foundRub, label: foundRub };
    var rb = ge('ss-rub-btn');
    if (rb) {
      rb.classList.add('filled');
      var rt = rb.querySelector('.ss-txt'); if (rt) rt.textContent = foundRub;
    }
    var rh = ge('ss-rub-hint');
    if (rh) { rh.textContent = '✔ ' + foundRub; rh.className = 'hint ok'; }
  }
  // Remplir catégorie si vide
  if (foundCat && !curCat) {
    var ci = ge('dom-cat'); if (ci) ci.value = foundCat;
    [].forEach.call(document.querySelectorAll('.cat-btn'), function(b) {
      b.classList.toggle('active', b.getAttribute('data-cat') === foundCat);
    });
    var ch = ge('cat-hint');
    if (ch) { ch.textContent = '✔ ' + foundCat; ch.className = 'hint ok'; }
  }
}


function ssFilter(key, q) { ssRender(key, q); }

// Fermer sur clic extérieur
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'vider-modal') closeViderModal();
  if (!e.target.closest('.ss-wrap')) ssClose();
  if (!e.target.closest('.ac-wrap')) {
    var ac = ge('chassis-ac');
    if (ac) ac.classList.remove('open');
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { ssClose(); closeSP(); closeViderModal(); }
});

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// AUTOCOMPLETE CHÂSSIS
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function onChassis(input) {
  var v = input.value.replace(/[^A-Za-z0-9]/g,'').toUpperCase().slice(0,17);
  input.value = v;
  var hint = ge('chassis-hint');
  if (hint) { hint.textContent = vinHint(v); hint.className = 'hint' + (isValidVIN(v) ? ' ok' : v.length ? ' err' : ''); }
  input.className = isValidVIN(v) ? 'ok' : v.length ? 'invalid' : '';
  // Autocomplete depuis historique
  var ac = ge('chassis-ac');
  if (!ac || v.length < 5) { if(ac) ac.classList.remove('open'); return; }
  var seen = {};
  var matches = G.demandes.filter(function(d) {
    if (d.chassis && d.chassis.indexOf(v)===0 && !seen[d.chassis]) { seen[d.chassis]=true; return true; }
    return false;
  }).slice(0,5);
  if (!matches.length) { ac.classList.remove('open'); return; }
  ac.innerHTML = matches.map(function(d) {
    return '<div class="ac-item" data-vin="'+esc(d.chassis)+'" onclick="acPick(this)">'+
      '<div class="ac-vin">'+esc(d.chassis)+'</div>'+
      '<div class="ac-det">'+esc(d.site)+' — OR '+esc(d.or||'')+'</div></div>';
  }).join('');
  ac.classList.add('open');
}

function acPick(el) {
  var vin = el.getAttribute('data-vin');
  var d = G.demandes.find(function(x) { return x.chassis === vin; });
  var acEl = ge('chassis-ac'); if(acEl) acEl.classList.remove('open');
  if (!d) return;
  ge('chassis').value = vin;
  var hint = ge('chassis-hint');
  if (hint) { hint.textContent = '✔ Châssis valide'; hint.className = 'hint ok'; }
  ge('chassis').className = 'ok';
  if (d.kilometrage) sv('kilometrage', d.kilometrage);
  if (d.date_or)     sv('date_or', d.date_or);
  if (d.conseiller_client)  sv('conseiller_client', d.conseiller_client);
  if (d.email_usager) sv('email_usager', d.email_usager);
  if (d.kvps && !ge('kvps').readOnly) sv('kvps', d.kvps);
  if (d.site && G.role === 'team') {
    ge('f-site').value = d.site;
    ge('h-site-name').textContent = d.site;
    [].forEach.call(document.querySelectorAll('.s-btn'), function(b) { b.classList.toggle('active', b.textContent.trim()===d.site); });
  }
  toast('✔ Véhicule reconnu — informations pré-remplies');
}

function onOR(input) {
  var v = input.value.replace(/\D/g,'').slice(0,6);
  input.value = v;
  var hint = ge('or-hint');
  if (hint) { hint.textContent = v.length+' / 6 chiffres'; hint.className = 'hint'+(v.length===6?' ok':v.length?' err':''); }
  input.className = v.length===6 ? 'ok' : v.length ? 'invalid' : '';
}

// CCR : affiche le bloc Factures uniquement si le plan ELSA n'est pas disponible
function onElsaChange() {
  var val = gr('elsa_dispo');
  var wrap = ge('factures-wrap');
  if (wrap) wrap.style.display = (val === 'NON') ? 'block' : 'none';
  saveDraft();
}

// CCR : IQ n° = 9 chiffres
function onIqInput(input) {
  var v = input.value.replace(/\D/g,'').slice(0,9);
  input.value = v;
  var hint = ge('iq-hint');
  if (hint) { hint.textContent = v.length+' / 9 chiffres'; hint.className = 'hint'+(v.length===9?' ok':v.length?' err':''); }
  input.className = v.length===9 ? 'ok' : v.length ? 'invalid' : '';
  saveDraft();
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// KULANZ SAVE / COPY
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function saveKulanz() {
  G.kulanzData = {
    site:        ge('f-site') ? ge('f-site').value : '',
    chassis:     gv('chassis'),      kilometrage: gv('kilometrage'),
    or_number:   gv('or_number'),    date_or:     gv('date_or'),
    kvps:        gv('kvps'),         conseiller_client:  gv('conseiller_client'),
    email_usager:gv('email_usager'), plainte_client:gv('plainte_client'),
    emplacement: gv('emplacement'),  ref_piece:   gv('ref_piece'),
    dom_cat:     ge('dom-cat')  ? ge('dom-cat').value  : '',
    dom_rub:     ge('rub-val')  ? ge('rub-val').value  : '',
    desig_piece: ge('desig-val')? ge('desig-val').value: '',
    dom_code:    ge('dom-val')  ? ge('dom-val').value  : '',
    dom_lbl:     ge('dom-lbl')  ? ge('dom-lbl').value  : '',
    ava_code:    ge('ava-val')  ? ge('ava-val').value  : '',
    ava_lbl:     ge('ava-lbl')  ? ge('ava-lbl').value  : ''
  };
}

function copyKulanz() {
  saveKulanz(); // S'assurer que les données sont à jour
  var k = G.kulanzData;
  if (!k || (!k.chassis && !k.or_number && !k.plainte_client)) {
    alert('⚠ Aucune donnée Kulanz à copier. Remplissez d’abord le formulaire.');
    return;
  }
  ['chassis','kilometrage','or_number','date_or','kvps','conseiller_client','email_usager',
   'plainte_client','emplacement','ref_piece'].forEach(function(n) { if(k[n]) sv(n,k[n]); });
  if (k.site) {
    ge('f-site').value = k.site;
    ge('h-site-name').textContent = k.site;
    [].forEach.call(document.querySelectorAll('.s-btn'), function(b) { b.classList.toggle('active', b.textContent.trim()===k.site); });
  }
  // Restaurer la cascade
  if (k.dom_cat) {
    var ci=ge('dom-cat'); if(ci)ci.value=k.dom_cat;
    var catBtn=document.querySelector('.cat-btn[data-cat="'+k.dom_cat+'"]');
    if(catBtn)catBtn.classList.add('active');
    var ch=ge('cat-hint'); if(ch){ch.textContent='✔ '+k.dom_cat;ch.className='hint ok';}
  }
  if (k.dom_rub) {
    var rv=ge('rub-val'); if(rv)rv.value=k.dom_rub;
    ssState['rub']={code:k.dom_rub,label:k.dom_rub};
    var rb=ge('ss-rub-btn'); if(rb){rb.classList.add('filled');
      var rt=rb.querySelector('.ss-txt');if(rt)rt.textContent=k.dom_rub;}
  }
  if (k.desig_piece) {
    var dv=ge('desig-val'); if(dv)dv.value=k.desig_piece;
    ssState['desig']={code:k.desig_piece,label:k.desig_piece};
    var db=ge('ss-desig-btn'); if(db){db.classList.add('filled');
      var dt=db.querySelector('.ss-txt');if(dt)dt.textContent=k.desig_piece;}
  }
  if (k.dom_code) {
    ssSet('dom', k.dom_code, k.dom_lbl);

  }
  ssSet('ava', k.ava_code, k.ava_lbl);
  if (k.chassis) {
    var h = ge('chassis-hint');
    if (h) { h.textContent = vinHint(k.chassis); h.className = 'hint'+(isValidVIN(k.chassis)?' ok':' err'); }
    ge('chassis').className = isValidVIN(k.chassis) ? 'ok' : 'invalid';
  }
  // Re-rendre le formulaire KULANZ pour le site copié
  if (k.site) renderKulanzForm(k.site);
  setType('C'); // Passer en CCR
  toast('✔ Données Kulanz copiées en CCR !');
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// BROUILLON
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
var draftTimer = null;

// Capture COMPLÈTE de l'état du formulaire (tous les champs + réponses KULANZ).
// Utilisée pour le brouillon ET pour enregistrer toutes les données d'une demande.
function formSnapshot() {
  var b = {
    site: ge('f-site').value, type: ge('f-type').value,
    chassis: gv('chassis'), kilometrage: gv('kilometrage'),
    or_number: gv('or_number'), date_or: gv('date_or'), kvps: gv('kvps'),
    conseiller_client: gv('conseiller_client'), email_usager: gv('email_usager'),
    plainte_client: gv('plainte_client'),
    emplacement: gv('emplacement'), ref_piece: gv('ref_piece'),
    desig_piece: (ge('desig-val')?ge('desig-val').value:''), commentaires: gv('commentaires'),
    dom_cat: ge('dom-cat') ? ge('dom-cat').value : '',
    dom_rub: ge('rub-val') ? ge('rub-val').value : '',
    dom_code: ge('dom-val') ? ge('dom-val').value : '',
    dom_lbl: ge('dom-lbl') ? ge('dom-lbl').value : '',
    ava_code: ge('ava-val') ? ge('ava-val').value : '',
    ava_lbl: ge('ava-lbl') ? ge('ava-lbl').value : ''
  };
  var _s = ge('f-site') ? ge('f-site').value : '';
  var _q = (typeof KULANZ_BY_BRAND!=='undefined' && typeof SITE_BRAND!=='undefined')
    ? (KULANZ_BY_BRAND[SITE_BRAND[_s]||'VW']||[]) : [];
  _q.forEach(function(q){ b['k_'+q.name] = gr(q.name) || ''; });
  b.num_tpi = gv('num_tpi') || '';
  b.iq_num = gv('iq_num') || '';
  b.elsa_dispo = gr('elsa_dispo') || '';
  return b;
}

function saveDraft() {
  if (typeof updateFormProgress === 'function') updateFormProgress();
  G._dirty = true; // formulaire modifié non envoyé
  clearTimeout(draftTimer);
  draftTimer = setTimeout(function() {
    var b = formSnapshot();
    var _s = b.site || 'default';
    try { var _draftKey = 'gea_draft_' + _s;
      localStorage.setItem(_draftKey, JSON.stringify(b));
      localStorage.setItem('gea_draft_last', _draftKey); } catch(e) {}
    // Indicateur discret "✓ Enregistré"
    var ind = ge('form-saved-ind');
    if (ind) { ind.style.opacity = '1'; clearTimeout(window._savedIndT); window._savedIndT = setTimeout(function(){ ind.style.opacity = '0'; }, 1500); }
  }, 700);
}

function restoreDraft() {
  try {
    var _lastKey = localStorage.getItem('gea_draft_last') || 'gea_draft';
    var s = localStorage.getItem(_lastKey);
    if (!s) return;
    var b = JSON.parse(s);
    if (!b.chassis && !b.or_number) return;
    var _choix = confirm(
      '📋 Brouillon trouvé\n\n'
      + 'Site : '+(b.site||'?')+'  |  N° OR : '+(b.or_number||'?')+'\n'
      + 'Châssis : '+(b.chassis||'?')+'\n\n'
      + 'OK      → Restaurer le brouillon\n'
      + 'Annuler → Vider et repartir à zéro'
    );
    if (!_choix) {
      (function(){ try{ var _lk=localStorage.getItem('gea_draft_last')||'gea_draft';localStorage.removeItem(_lk);localStorage.removeItem('gea_draft_last'); }catch(e){} })();
      return;
    }
    fillFormFromRecord(b);
    toast('✔ Brouillon restauré !');
  } catch(e) { console.warn('Draft restore error:', e); }
}

// Remplit le formulaire à partir d'un objet (brouillon OU demande enregistrée).
// Accepte les deux schémas de noms : brouillon (or_number/dom_*) et enregistrement (or/code_dommage…).
function fillFormFromRecord(b) {
  if (!b) return;
  // Normaliser les variantes de noms de champs entre brouillon et demande stockée
  var or_number = b.or_number || b.or || '';
  var dom_cat   = b.dom_cat   || b.categorie || '';
  var dom_rub   = b.dom_rub   || b.rubrique  || '';
  var desig     = b.desig_piece || '';

  // Restaurer le site (team : on l'applique ; usager : déjà fixé par son login)
  if (b.site && SITES.indexOf(b.site) !== -1 && G.role === 'team') {
    ge('f-site').value = b.site;
    ge('h-site-name').textContent = b.site;
    [].forEach.call(document.querySelectorAll('.s-btn'), function(btn) { btn.classList.toggle('active', btn.textContent.trim()===b.site); });
  }
  var draftSite = (b.site && SITES.indexOf(b.site) !== -1)
    ? b.site
    : (ge('f-site') ? ge('f-site').value : '');
  // KVPS + champs site (jamais laissés vides)
  if (draftSite) {
    var kvpsEl3 = ge('kvps');
    if (kvpsEl3) kvpsEl3.value = (b.kvps && String(b.kvps).trim()) ? b.kvps : (KVPS_MAP[draftSite] || '');
    var sdEl3 = ge('site-display'); if (sdEl3) sdEl3.value = draftSite;
    var siteFieldEl = ge('site-field'); if (siteFieldEl) siteFieldEl.style.display = 'flex';
  }
  // Champs texte simples
  if (or_number) sv('or_number', or_number);
  ['chassis','kilometrage','conseiller_client','email_usager',
   'plainte_client','emplacement','ref_piece','commentaires'].forEach(function(n) {
    if (b[n]) sv(n, b[n]);
  });
  if (b.date_or && /^\d{4}-\d{2}-\d{2}$/.test(b.date_or)) sv('date_or', b.date_or);
  // Catégorie
  if (dom_cat) {
    var ci=ge('dom-cat'); if(ci)ci.value=dom_cat;
    var cb=document.querySelector('.cat-btn[data-cat="'+dom_cat+'"]');
    if(cb)cb.classList.add('active');
    var ch=ge('cat-hint'); if(ch){ch.textContent='✔ '+dom_cat;ch.className='hint ok';}
  }
  // Rubrique
  if (dom_rub) {
    var rv=ge('rub-val'); if(rv)rv.value=dom_rub;
    ssState['rub']={code:dom_rub,label:dom_rub};
    var rb=ge('ss-rub-btn'); if(rb){rb.classList.add('filled');
      var rt=rb.querySelector('.ss-txt');if(rt)rt.textContent=dom_rub;}
  }
  // Désignation
  if (desig) {
    var dv=ge('desig-val'); if(dv)dv.value=desig;
    ssState['desig']={code:desig,label:desig};
    var db=ge('ss-desig-btn'); if(db){db.classList.add('filled');
      var dbt=db.querySelector('.ss-txt');if(dbt)dbt.textContent=desig;}
  }
  // Code dommage : brouillon a dom_code/dom_lbl ; enregistrement a "code — libellé" dans code_dommage
  var dCode = b.dom_code || '', dLbl = b.dom_lbl || '';
  if (!dCode && b.code_dommage) {
    var parts = String(b.code_dommage).split(' — ');
    dCode = parts[0] || ''; dLbl = parts[1] || '';
  }
  if (dCode) {
    var dv2=ge('dom-val'); if(dv2)dv2.value=dCode;
    var dl=ge('dom-lbl'); if(dl)dl.value=dLbl;
    ssState['dom']={code:dCode,label:dLbl||dCode};
    var dm=ge('ss-dom-btn'); if(dm){dm.classList.add('filled');
      var dmt=dm.querySelector('.ss-txt');if(dmt)dmt.textContent=dCode+(dLbl?' — '+dLbl:'');}
  }
  // Re-rendre le formulaire KULANZ pour le bon site avant de restaurer les réponses
  if (draftSite) renderKulanzForm(draftSite);
  if (b.ava_code) ssSet('ava', b.ava_code, b.ava_lbl);
  if ((b.type === 'CCR')) setType('C');
  if (b.chassis) onChassis(ge('chassis'));
  // Réponses KULANZ
  if (typeof KULANZ_BY_BRAND !== 'undefined') {
    var brandQs = KULANZ_BY_BRAND[SITE_BRAND[draftSite]||'VW']||[];
    brandQs.forEach(function(q){
      var val = b['k_'+q.name];
      if (val) {
        var radios = document.querySelectorAll('[name="'+q.name+'"]');
        [].forEach.call(radios, function(r){ r.checked = (r.value===val); });
      }
    });
    if (b.num_tpi) { sv('num_tpi', b.num_tpi); toggleTpiField(true); }
  }
  // CCR : IQ + plan ELSA
  if (b.iq_num) { sv('iq_num', b.iq_num); var iqEl=ge('iq-num'); if(iqEl) onIqInput(iqEl); }
  if (b.elsa_dispo) {
    var er=document.querySelector('[name="elsa_dispo"][value="'+b.elsa_dispo+'"]'); if(er){ er.checked=true; onElsaChange(); }
  }
  checkKulanzNok();
}

document.addEventListener('input',  function(e) {
  if (!e.target.closest('#mainForm')) return;
  if (e.target.classList) e.target.classList.remove('field-error');
  saveDraft();
  updateFormProgress();
});
document.addEventListener('change', function(e) {
  if (!e.target.closest('#mainForm')) return;
  saveDraft();
  if (e.target.name === 'tpi')  toggleTpiField(e.target.value === 'OUI');
  if (e.target.name === 'cig')  { var ct=ge('cig-taux'); ct.disabled=e.target.value!=='superieur'; if(!ct.disabled) ct.focus(); }
  // Déclencher checkKulanzNok sur tout radio dans la section KULANZ
  var kzone = ge('kulanz-questions');
  if (kzone && kzone.contains(e.target)) checkKulanzNok();
  updateFormProgress();
});

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// COLLECTE DES DONNÉES
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function collectData() {
  var site    = ge('f-site') ? ge('f-site').value : '';
  var type    = ge('f-type') ? ge('f-type').value || 'Kulanz' : 'Kulanz';
  var domCode = ge('dom-val') ? ge('dom-val').value : '';
  var domLbl  = ge('dom-lbl') ? ge('dom-lbl').value : '';
  var avaCode = ge('ava-val') ? ge('ava-val').value : '';
  var avaLbl  = ge('ava-lbl') ? ge('ava-lbl').value : '';
  var domFull = domCode ? domCode + (domLbl ? ' — '+domLbl : '') : '';
  var avaFull = avaCode ? avaCode + (avaLbl ? ' — '+avaLbl : '') : '';
  var fields = [
    { l:'N° OR',            v:gv('or_number') },
    { l:'Date OR',          v:gv('date_or') },
    { l:'KVPS',             v:gv('kvps') },
    { l:'Nom du demandeur', v:gv('conseiller_client') },
    { l:'E-mail',           v:gv('email_usager') },
    { l:'Châssis',          v:gv('chassis') },
    { l:'Kilométrage',      v:gv('kilometrage') ? gv('kilometrage')+' km' : '' },
    { l:'Plainte client',   v:gv('plainte_client') },
    { l:'Catégorie',        v:(ge('dom-cat')?ge('dom-cat').value:'') },
    { l:'Rubrique',         v:(ge('rub-val')?ge('rub-val').value:'') },
    { l:'Désignation pièce', v:(ge('desig-val')?ge('desig-val').value:'') },
    { l:'Code dommage',     v:domFull },
    { l:'Code avarie',      v:avaFull },
    { l:'Emplacement',      v:gv('emplacement') },
    { l:'Référence pièce',  v:gv('ref_piece') },
  ];
  if (type === 'Kulanz') {
    var brand2 = SITE_BRAND[site] || 'VW';
    var brandQs = KULANZ_BY_BRAND[brand2] || KULANZ_BY_BRAND['VW'];
    var kFields = [{ l:'N° TPI', v:gv('num_tpi') }];
    brandQs.forEach(function(q) {
      kFields.push({ l:q.label, v:gr(q.name) });
    });
    fields = fields.concat(kFields);
  } else {
    var pcs = []; [].forEach.call(document.querySelectorAll('[name="pieces[]"]:checked'), function(el){ pcs.push(el.value); });
    fields = fields.concat([
      { l:'KULANZ effectuée', v:gr('kulanz_done') },
      { l:'CIG',              v:gr('cig') },
      { l:'Taux CIG',         v:gv('cig_taux') },
      { l:'Pièces jointes',   v:pcs.join(' | ') },
    ]);
  }
  fields.push({ l:'Commentaires', v:gv('commentaires') });
  return { site:site, type:type, fields:fields, domFull:domFull };
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// ENVOYER
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function envoyerFormulaire() {
  var site  = ge('f-site') ? ge('f-site').value : '';
  var type  = (ge('f-type') && ge('f-type').value) ? ge('f-type').value : 'Kulanz';
  var isCCR = (type === 'CCR');

  // === VALIDATION GROUPÉE : on collecte TOUT, on surligne, une seule alerte ===
  // Nettoyer les surlignages précédents
  [].forEach.call(document.querySelectorAll('.field-error'), function(el){ el.classList.remove('field-error'); });

  var errs = [];
  var mark = function(elId, msg, focusId) {
    errs.push({ msg: msg, focusId: focusId || elId });
    var el = ge(elId); if (el) el.classList.add('field-error');
    // surligner aussi le bouton du select cascade si présent
    var ssb = ge('ss-' + elId.replace('-val','') + '-btn'); if (ssb) ssb.classList.add('field-error');
  };

  if (!site) mark('site-display', 'Sélectionnez un site', 'site-display');
  if (!isValidVIN(gv('chassis'))) mark('chassis', 'Châssis invalide (17 caractères, sans I/O/Q)', 'chassis');
  if (!/^\d{6}$/.test(gv('or_number'))) mark('or-num', 'N° OR : 6 chiffres requis', 'or-num');
  if (!gv('plainte_client')) mark('plainte_client', 'Plainte client obligatoire', 'plainte_client');
  if (!ge('desig-val') || !ge('desig-val').value) mark('ss-piece-btn', 'Choisissez une pièce ou un code dommage', 'ss-piece-btn');
  if (!ge('dom-val') || !ge('dom-val').value) mark('ss-piece-btn', 'Code dommage manquant — choisissez une pièce ou saisissez le code en mode détaillé', 'ss-piece-btn');
  if (!ge('ava-val') || !ge('ava-val').value) mark('ava-val', 'Sélectionnez un code avarie', 'ss-ava-btn');
  if (!gv('conseiller_client')) mark('conseiller_client', 'Nom du demandeur obligatoire', 'conseiller_client');
  var email = gv('email_usager');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) mark('email_usager', 'E-mail invalide', 'email_usager');
  if (isCCR) {
    if (!gr('elsa_dispo')) errs.push({ msg: 'Indiquez si le plan ELSA est disponible (Oui/Non)', focusId: 'factures-wrap' });
    if (!/^\d{9}$/.test(gv('iq_num'))) mark('iq-num', 'N° IQ obligatoire (9 chiffres)', 'iq-num');
    var chkE = ge('chk-engagement');
    if (!chkE || !chkE.checked) errs.push({ msg: 'Cochez la case d\'engagement', focusId: 'chk-engagement' });
  }

  if (errs.length) {
    var liste = errs.map(function(e, i){ return (i+1) + '. ' + e.msg; }).join('\n');
    alert('⚠ Merci de corriger les points suivants ('+errs.length+') :\n\n' + liste);
    // Aller au premier champ en erreur
    var f = ge(errs[0].focusId);
    if (f) {
      try { f.scrollIntoView({ behavior:'smooth', block:'center' }); } catch(e){}
      if (typeof f.focus === 'function') { try { f.focus({preventScroll:true}); } catch(e){ f.focus(); } }
    }
    return;
  }

  var btn = ge('btn-envoyer');
  if (!btn || btn.disabled) return;

  // === MODE MODIFICATION SANS ENVOI (clic ligne TeamGarantie) ===
  if (G.editOnly && G.editingId) {
    if (!confirm('Enregistrer les modifications de cette demande ?\n(Aucun e-mail ne sera envoyé)')) return;
    var dEdit = collectData();
    var orig = getDemandeById(G.editingId) || {};
    var rec = {
      id: orig.id, date: orig.date || new Date().toLocaleDateString('fr-FR'),
      site: dEdit.site, type: dEdit.type, or: gv('or_number'), chassis: gv('chassis'),
      code_dommage: dEdit.domFull,
      desig_piece: ge('desig-val')?ge('desig-val').value:'',
      rubrique: ge('rub-val')?ge('rub-val').value:'',
      categorie: ge('dom-cat')?ge('dom-cat').value:'',
      email_usager: gv('email_usager'), conseiller_client: gv('conseiller_client'),
      kilometrage: gv('kilometrage'), date_or: gv('date_or'), kvps: gv('kvps'),
      // on conserve le statut et les infos de traitement existants
      statut: orig.statut || 'En attente',
      commentaire_team: orig.commentaire_team || '',
      commerce: orig.commerce || null
    };
    (function(snap){ for (var k in snap) if (snap.hasOwnProperty(k) && !(k in rec)) rec[k]=snap[k]; })(formSnapshot());
    btn.disabled = true; btn.textContent = 'Enregistrement\u2026';
    var keyE = 'd'+String(rec.id).replace(/[^a-zA-Z0-9]/g,'');
    var saveE = demandesRef ? demandesRef.child(keyE).set(rec) : (function(){ var i=G.demandes.findIndex(function(x){return x.id==rec.id;}); if(i!==-1) G.demandes[i]=rec; return Promise.resolve(); })();
    Promise.resolve(saveE).then(function(){
      try { (function(){ var _lk=localStorage.getItem('gea_draft_last')||'gea_draft';localStorage.removeItem(_lk);localStorage.removeItem('gea_draft_last'); })(); } catch(e){}
      G.editOnly = false; G.editingId = null; G._dirty = false;
      clearReopenBanner();
      toast('✔ Modifications enregistrées (sans envoi de mail).');
      renderHisto(); if (G.role==='team') renderDash();
      showPage('demandes', ge('tab-demandes'));
    }).catch(function(e){ console.warn('Save edit:',e); toast('❌ Erreur d\'enregistrement.'); })
    .finally(function(){
      btn.disabled = false;
      var _svg=btn.querySelector('svg'); btn.innerHTML=(_svg?_svg.outerHTML:'')+' Envoyer la demande';
    });
    return;
  }

  var _ct = 'Confirmer l\'envoi ?'
    + '\nSite : '+site+'  |  N° OR : '+gv('or_number')+'  |  Châssis : '+gv('chassis');
  if (isCCR) _ct += '\n\n⚠ Après OK : le PDF est généré et les instructions s\'affichent.';
  if (!confirm(_ct)) return;

  var d = collectData();

  if (isCCR) {
    btn.disabled = true; btn.textContent = 'Pr\u00e9paration\u2026';
    try { genererPDF(); } catch(e) { console.warn('PDF:', e); }
    // Corps mail: texte ASCII pur (pas de caracteres speciaux) pour eviter surcharge URL
    var _elsa = gr('elsa_dispo') || '-';
    var _fact = '';
    if (_elsa === 'NON') {
      var _pcs = []; [].forEach.call(document.querySelectorAll('[name="pieces[]"]:checked'), function(el){ _pcs.push(el.value); });
      _fact = _pcs.filter(function(x){return x.indexOf('Factures')===0;}).join(', ') || 'aucune';
    }
    var _devis = document.querySelector('[name="pieces[]"][value="Devis"]:checked') ? 'oui' : 'non';
    var _fct   = document.querySelector('[name="pieces[]"][value="Feuille Commentaire Technicien"]:checked') ? 'oui' : 'non';

    var corps = 'DEMANDE CCR - ' + site + '\n';
    corps += 'A: ' + (gv('email_usager')||'-') + '  |  CC: teamgarantie@geauto.fr\n';
    corps += 'N OR: ' + gv('or_number') + '  |  Chassis: ' + gv('chassis') + '\n';
    corps += 'Conseiller client: ' + gv('conseiller_client') + '\n';
    corps += 'KVPS: ' + (gv('kvps')||'') + '  |  Date OR: ' + (gv('date_or')||'') + '  |  Km: ' + (gv('kilometrage')||'') + '\n\n';
    corps += 'NATURE DOMMAGE:\n';
    corps += 'Categorie: ' + (ge('dom-cat')?ge('dom-cat').value:'') + '\n';
    corps += 'Rubrique: ' + (ge('rub-val')?ge('rub-val').value:'') + '\n';
    corps += 'Designation piece: ' + (ge('desig-val')?ge('desig-val').value:'') + '\n';
    corps += 'Code dommage: ' + (ge('dom-val')?ge('dom-val').value:'') + '\n';
    corps += 'Code avarie: ' + (ge('ava-val')?ge('ava-val').value:'') + '\n';
    corps += 'Emplacement: ' + (gv('emplacement')||'') + '\n\n';
    corps += 'PIECES A FOURNIR:\n';
    corps += 'Plan ELSA disponible: ' + _elsa + '\n';
    if (_elsa === 'NON') corps += 'Factures fournies: ' + _fact + '\n';
    corps += 'IQ n: ' + (gv('iq_num')||'-') + '\n';
    corps += 'Devis: ' + _devis + '\n';
    corps += 'Feuille Commentaire Technicien: ' + _fct + '\n\n';
    corps += 'PLAINTE CLIENT:\n' + (gv('plainte_client')||'') + '\n\n';
    corps += 'A joindre: PDF Demande CCR + justificatifs, puis envoyer depuis Outlook.\n';
    corps += 'Team Garantie GEA - VW';
    var kvps2   = gv('kvps') || site;
    var subject = 'Demande CCR - ' + kvps2 + ' - ' + site + ' - ' + gv('chassis') + ' - ' + gv('conseiller_client');
    window._lastSubject = subject; // Stocké pour copierObjetMail()
    // Limiter pour compatibilite clients mail, mais assez large pour contenir codes + plainte
    var corpsLimite = corps.length > 1800
      ? corps.substring(0, 1800) + '\n[Voir PDF pour details complets]'
      : corps;
    // Destinataire = usager qui a généré la demande ; teamgarantie en copie (CC)
    var _destCCR = (gv('email_usager') || '').trim() || 'teamgarantie@geauto.fr';
    var _ccCCR   = (_destCCR.toLowerCase() !== 'teamgarantie@geauto.fr')
                 ? '&cc=' + encodeURIComponent('teamgarantie@geauto.fr') : '';
    var mailto  = 'mailto:' + _destCCR
                + '?subject=' + encodeURIComponent(subject)
                + _ccCCR
                + '&body='    + encodeURIComponent(corpsLimite);
    // Ouvrir Outlook — méthode universelle Chrome/Firefox/Edge
    // createElement + click = jamais bloqué car c'est un geste utilisateur direct
    try {
      var _a = document.createElement('a');
      _a.href = mailto;
      _a.style.display = 'none';
      document.body.appendChild(_a);
      _a.click();
      setTimeout(function(){ document.body.removeChild(_a); }, 500);
    } catch(e) {
      // Fallback si createElement échoue
      window.location.href = mailto;
    }
    var newD = {
      id: Date.now()+'_'+Math.random().toString(36).slice(2,5),
      date: new Date().toLocaleDateString('fr-FR'),
      site: d.site, type: 'CCR',
      or: gv('or_number'), chassis: gv('chassis'), code_dommage: d.domFull,
      desig_piece: ge('desig-val')?ge('desig-val').value:'',
      rubrique: ge('rub-val')?ge('rub-val').value:'',
      categorie: ge('dom-cat')?ge('dom-cat').value:'',
      email_usager: email, conseiller_client: gv('conseiller_client'),
      kilometrage: gv('kilometrage'), date_or: gv('date_or'), kvps: gv('kvps'),
      statut: 'Demande envoyée', commentaire_team: '', commerce: null
    };
    // Conserver TOUS les champs du formulaire (plainte, emplacement, réponses KULANZ, codes séparés…)
    (function(snap){ for (var k in snap) if (snap.hasOwnProperty(k) && !(k in newD)) newD[k]=snap[k]; })(formSnapshot());
    // Mode modification : réutiliser l'id et la date d'origine
    if (G.editingId) { var _o=getDemandeById(G.editingId); if(_o){ newD.id=_o.id; newD.date=_o.date||newD.date; } }
    if (demandesRef) demandesRef.child('d'+newD.id.replace(/[^a-zA-Z0-9]/g,'')).set(newD).catch(function(e){console.warn('Firebase CCR:',e);});
    else G.demandes.unshift(newD);
    try { (function(){ try{ var _lk=localStorage.getItem('gea_draft_last')||'gea_draft';localStorage.removeItem(_lk);localStorage.removeItem('gea_draft_last'); }catch(e){} })(); } catch(e) {}
    var _ml2  = window._lastMailto  || '';
    var _sbj2 = window._lastSubject || '';
    window._ccrSubject = _sbj2;
    ge('success-details').innerHTML =
      '<strong>Site\u00a0:</strong> '+esc(newD.site)
      +'&nbsp;&nbsp;<strong>N\u00b0 OR\u00a0:</strong> '+esc(newD.or)
      +'&nbsp;&nbsp;<strong>Ch\u00e2ssis\u00a0:</strong> '+esc(newD.chassis)
      +'<div style="background:#fff8e1;border:2px solid #f39c12;border-radius:8px;padding:14px;margin-top:10px">'
      +'<div style="font-weight:700;color:#c0392b;margin-bottom:10px">\u26a0\ufe0f ACTIONS OBLIGATOIRES :</div>'
      +'\u2705 <strong>1.</strong> PDF g\u00e9n\u00e9r\u00e9 \u2014 sauvegardez-le<br><br>'
      +'\u2709\ufe0f <strong>2.</strong> Ouvrez Outlook et cr\u00e9ez un nouveau mail avec les informations ci-dessous :'
      +'<details style="margin-top:6px;font-size:11px">'
      +'<summary style="cursor:pointer;color:#0078d4;font-weight:700">'
      +'\u2699\ufe0f Configurer Outlook comme client par d\u00e9faut</summary>'
      +'<div style="background:#f0f4ff;border:1px solid #c7d3f7;border-radius:4px;padding:10px;margin-top:6px">'
      +'<strong>M\u00e9thode 1 \u2014 Param\u00e8tres Windows :</strong><br>'
      +'1. D\u00e9marrer \u2192 <strong>Param\u00e8tres</strong><br>'
      +'2. <strong>Applications</strong> \u2192 <strong>Applications par d\u00e9faut</strong><br>'
      +'3. Chercher <strong>\'E-mail\'</strong> \u2192 s\u00e9lectionner <strong>Microsoft Outlook</strong><br>'
      +'4. Cliquer <strong>D\u00e9finir par d\u00e9faut</strong><br><br>'
      +'<strong>M\u00e9thode 2 \u2014 Depuis Outlook :</strong><br>'
      +'1. Ouvrir <strong>Outlook</strong><br>'
      +'2. <strong>Fichier</strong> \u2192 <strong>Options</strong> \u2192 onglet <strong>G\u00e9n\u00e9ral</strong><br>'
      +'3. Section <strong>Options de d\u00e9marrage</strong><br>'
      +'4. Cocher <strong>\'D\u00e9finir Outlook comme programme par d\u00e9faut pour l\'e-mail\'</strong><br>'
      +'5. Cliquer <strong>OK</strong>'
      +'</div></details>'
      +'<br><br><div style="background:#f5f5f5;border:1px solid #ccc;border-radius:4px;padding:8px;font-size:11px">'
      +'<strong>\u00c0 :</strong> teamgarantie@geauto.fr<br>'
      +'<strong>Objet :</strong><br>'
      +'<input type="text" readonly onclick="this.select()" '
      +'value="'+esc(_sbj2)+'" '
      +'style="width:100%;margin-top:4px;padding:6px 8px;font-size:11px;'
      +'font-family:monospace;border:1px solid #ccc;border-radius:4px;'
      +'background:#fff;cursor:text;box-sizing:border-box" '
      +'title="Cliquez pour s\u00e9lectionner, puis Ctrl+C pour copier">'
      +'<span style="font-size:10px;color:#888;display:block;margin-top:2px">'
      +'\u261d\ufe0f Cliquez sur le champ puis Ctrl+C pour copier</span></div>'
      +'<br>\ud83d\udcce <strong>3.</strong> Joindre le <strong>PDF</strong> + documents justificatifs'
      +'<br>\ud83d\udce4 <strong>4.</strong> Envoyer depuis Outlook</div>';
    G._dirty = false; ge('success-overlay').classList.add('open');
    // Bloc documents CCR : afficher + mémoriser la demande pour le mailto
    G._lastCCR = { site: newD.site, or: newD.or, chassis: newD.chassis, email: newD.email_usager };
    var _cdb = ge('ccr-docs-block'); if (_cdb) _cdb.style.display = 'block';
    setTimeout(function(){
      btn.disabled = false;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg> Envoyer la demande';
    }, 2000);
    return;
  }

  btn.disabled = true; btn.textContent = 'Envoi en cours\u2026';
  var msg = '\u2550'.repeat(40)+'\nDEMANDE '+d.type.toUpperCase()+' \u2014 '+d.site+'\n'+'\u2550'.repeat(40)+'\n\n';
  d.fields.filter(function(f){ return f.v; }).forEach(function(f){ msg += f.l+' : '+f.v+'\n'; });
  msg += '\n'+'\u2500'.repeat(40)+'\nTeam Garantie GEA \u2013 VW';
  // 1) Construire l'enregistrement (sauvegarde prioritaire, independante de l'e-mail)
  var newD2 = {
    id: Date.now()+'_'+Math.random().toString(36).slice(2,5),
    date: new Date().toLocaleDateString('fr-FR'),
    site: d.site, type: d.type, or: gv('or_number'), chassis: gv('chassis'),
    code_dommage: d.domFull,
    desig_piece: ge('desig-val')?ge('desig-val').value:'',
    rubrique: ge('rub-val')?ge('rub-val').value:'',
    categorie: ge('dom-cat')?ge('dom-cat').value:'',
    email_usager: email, conseiller_client: gv('conseiller_client'),
    kilometrage: gv('kilometrage'), date_or: gv('date_or'), kvps: gv('kvps'),
    statut: 'En attente', commentaire_team: '', commerce: null
  };
  // Conserver TOUS les champs du formulaire (plainte, emplacement, reponses KULANZ, codes separes...)
  (function(snap){ for (var k in snap) if (snap.hasOwnProperty(k) && !(k in newD2)) newD2[k]=snap[k]; })(formSnapshot());
  // Mode modification : reutiliser l'id et la date d'origine
  if (G.editingId) { var _o2=getDemandeById(G.editingId); if(_o2){ newD2.id=_o2.id; newD2.date=_o2.date||newD2.date; } }

  // 2) Enregistrer dans Firebase EN PREMIER (source de verite)
  var saveP;
  if (demandesRef) {
    saveP = demandesRef.child('d'+newD2.id.replace(/[^a-zA-Z0-9]/g,'')).set(newD2).then(function(){ return newD2; });
  } else {
    G.demandes.unshift(newD2);
    saveP = Promise.resolve(newD2);
  }

  saveP.then(function(rec){
    // 3) Notification "nouvelle demande" a la TeamGarantie -- en arriere-plan, NON bloquante.
    //    Si l'envoi echoue (reseau, spam...), la demande reste enregistree.
    try {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          access_key: WEB3_KEY,
          subject: '['+d.type+'] Nouvelle demande \u2013 '+d.site+' \u2013 OR '+gv('or_number'),
          message: msg, from_name: gv('conseiller_client')||d.site, replyto: email
        })
      }).catch(function(e){ console.warn('Notif TeamGarantie non envoyee:', e); });
    } catch(e){ console.warn('Notif TeamGarantie:', e); }

    // 4) Nettoyage brouillon + ecran de succes
    try { (function(){ try{ var _lk=localStorage.getItem('gea_draft_last')||'gea_draft';localStorage.removeItem(_lk);localStorage.removeItem('gea_draft_last'); }catch(e){} })(); } catch(e) {}
    G.editingId = null;
    ge('success-details').innerHTML =
      '<strong>Site\u00a0:</strong> '+esc(rec.site)+'<br>'+
      '<strong>Type\u00a0:</strong> '+esc(rec.type)+'<br>'+
      '<strong>N\u00b0 OR\u00a0:</strong> '+esc(rec.or)+'<br>'+
      '<strong>Ch\u00e2ssis\u00a0:</strong> '+esc(rec.chassis);
    var _cdbK = ge('ccr-docs-block'); if (_cdbK) _cdbK.style.display = 'none';
    G._dirty = false; ge('success-overlay').classList.add('open');
  })
  .catch(function(err){ console.error(err); toast('\u274c Erreur d\'enregistrement \u2013 reessayez.'); })
  .finally(function(){
    btn.disabled = false;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg> Envoyer la demande';
  });
}

function nouvelleDemande() {
  ge('success-overlay').classList.remove('open');
  if (typeof resetEnquete === 'function') resetEnquete();
  var _cdb = ge('ccr-docs-block'); if (_cdb) _cdb.style.display = 'none';
  G.editingId = null;
  G.editOnly = false;
  G._dirty = false;
  clearReopenBanner();
  var _bem = ge('btn-enregistrer-modifs'); if (_bem) _bem.style.display = 'none';
  G.reopenId = null;
  var _bv=ge('btn-envoyer');
  if(_bv){ var _svg=_bv.querySelector('svg'); _bv.innerHTML=(_svg?_svg.outerHTML:'')+' Envoyer la demande'; }
  ge('mainForm').reset();
  ge('f-type').value = 'Kulanz';
  ssReset('dom'); ssReset('ava');
  var ch = ge('chassis-hint'); if(ch) { ch.textContent='0 / 17 caractères'; ch.className='hint'; }
  var oh = ge('or-hint'); if(oh) { oh.textContent='0 / 6 chiffres'; oh.className='hint'; }
  ge('chassis').className = '';
  ge('or-num').className  = '';
  setType('K');
  resetCat();
  var _dci=ge('dom-cat'); if(_dci) _dci.value='';
  var kz=ge('kulanz-questions'); if(kz){[].forEach.call(kz.querySelectorAll('input[type=radio]'),function(r){r.checked=false;});}
  toggleTpiField(false);
  var _ce=ge('chk-engagement'); if(_ce) _ce.checked=false;
  var _cew=ge('ccr-engagement-wrap'); if(_cew) _cew.style.display='none';
  var vw=ge('vendu-wrapper'); if(vw)vw.style.display='none';
  var va=ge('vendu-alert'); if(va){va.style.display='none';va.innerHTML='';}
  var kna=ge('kulanz-nok-alert'); if(kna){kna.classList.remove('show');kna.innerHTML='';}  
  if(ge('desig-val')){ge('desig-val').value='';ge('desig-val').dataset.manual='';}
  if(ge('rub-val'))ge('rub-val').value='';
  // Réinitialiser cascade via resetBelow
  resetBelow('cat');
  enableAllDropdowns();
  if (G.role === 'usager') {
    ge('f-site').value = G.site;
    ge('kvps').value = KVPS_MAP[G.site]||'';
    ge('kvps').readOnly = true;
    ge('site-display').value = G.site;
  } else {
    [].forEach.call(document.querySelectorAll('.s-btn'), function(b) { b.classList.remove('active'); });
    ge('f-site').value = '';
  }
  window.scrollTo({top:0,behavior:'smooth'});
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// PDF
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function genererPDF() {
  var site = ge('f-site').value;
  if (!site) { alert('⚠ Veuillez sélectionner un site.'); return; }
  if (!/^\d{6}$/.test(gv('or_number'))) { alert('⚠ N° OR requis (6 chiffres).'); return; }
  if (!window.jspdf) { alert('⚠ Bibliothèque PDF non chargée.'); return; }
  var btn = ge('btn-pdf');
  if (!btn || btn.disabled) return;
  btn.disabled = true; btn.textContent = 'Génération…';
  try {
    var d = collectData();
    var orNum = gv('or_number');
    var kvps  = gv('kvps');
    var now   = new Date().toLocaleDateString('fr-FR', {day:'2-digit',month:'long',year:'numeric'});
    var title = '['+d.type.toUpperCase()+'] '+d.site+(kvps?' — '+kvps:'')+(ge('dom-val').value?' — '+ge('dom-val').value:'');
    var fname = title.replace(/[^a-zA-Z0-9_\-.[\]]/g,'_')+'_OR'+orNum+'.pdf';
    var doc = new window.jspdf.jsPDF({unit:'mm',format:'a4'});
    var W=210, ml=14, uw=W-ml*2, y=14;
    doc.setFillColor(26,26,46); doc.rect(ml,y,uw,17,'F');
    doc.setTextColor(212,174,82); doc.setFontSize(10); doc.setFont('helvetica','bold');
    doc.text(doc.splitTextToSize(title,uw-6),ml+3,y+6);
    doc.setTextColor(180,180,180); doc.setFontSize(7.5); doc.setFont('helvetica','normal');
    doc.text('OR: '+orNum+'  |  '+now+'  |  teamgarantie@geauto.fr',ml+3,y+14);
    y += 22;
    doc.setFillColor(240,237,232); doc.rect(ml,y,uw,7,'F');
    doc.setTextColor(26,26,46); doc.setFontSize(9); doc.setFont('helvetica','bold');
    doc.text('Détails de la demande',ml+3,y+5); y+=9;
    var cL=70, cV=uw-cL;
    d.fields.filter(function(f){return f.v&&f.v.trim();}).forEach(function(f,i) {
      var lines = doc.splitTextToSize(f.v, cV-4);
      var rh = Math.max(7, lines.length*5+2);
      if(y+rh>282){doc.addPage();y=14;}
      doc.setFillColor(i%2===0?255:247, i%2===0?255:246, i%2===0?255:242);
      doc.rect(ml,y,uw,rh,'F');
      doc.setDrawColor(221,221,221); doc.rect(ml,y,cL,rh,'S'); doc.rect(ml+cL,y,cV,rh,'S');
      doc.setFont('helvetica','bold'); doc.setTextColor(80,80,80); doc.setFontSize(8.5);
      doc.text(f.l,ml+3,y+5);
      doc.setFont('helvetica','normal'); doc.setTextColor(26,26,46); doc.setFontSize(9);
      doc.text(lines,ml+cL+3,y+5); y+=rh;
    });
    y+=5; doc.setDrawColor(200,200,200); doc.line(ml,y,ml+uw,y);
    doc.setFontSize(7); doc.setTextColor(160,160,160);
    doc.text('Team Garantie GEA – VW — '+now, W/2, y+4, {align:'center'});
    doc.save(fname);
    toast('✔ PDF enregistré : '+fname);
  } catch(e) {
    toast('❌ Erreur PDF : '+e.message); console.error(e);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Enregistrer en PDF';
  }
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// HISTORIQUE
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// Tri de l'historique au clic sur un en-tête (bascule asc/desc)
function sortHisto(key) {
  if (G.histoSort.key === key) {
    G.histoSort.dir = (G.histoSort.dir === 'asc') ? 'desc' : 'asc';
  } else {
    G.histoSort.key = key;
    G.histoSort.dir = (key === 'date') ? 'desc' : 'asc';
  }
  renderHisto();
}

// Export CSV de la liste actuellement affichée (type + filtres + recherche)
function exportHistoCSV() {
  var fS  = G.role==='usager' ? G.site : (ge('f-site')?ge('f-site').value:'');
  var fT  = G.histoType || 'Kulanz';
  var fSt = ge('f-stat-sel') ? ge('f-stat-sel').value : '';
  var q   = (ge('f-search') ? ge('f-search').value : '').toLowerCase().trim();
  var rows = G.demandes.filter(function(d) {
    if (d.type!==fT) return false;
    if (fS && d.site!==fS) return false;
    if (fSt && d.statut!==fSt) return false;
    if (q) { var hay=((d.chassis||'')+' '+(d.or||'')+' '+(d.conseiller_client||'')+' '+(d.code_dommage||'')).toLowerCase(); if(hay.indexOf(q)===-1) return false; }
    return true;
  });
  if (!rows.length) { toast('Aucune demande à exporter.'); return; }
  var cols = ['date','site','type','or','chassis','kvps','code_dommage','conseiller_client','email_usager','kilometrage','statut','commentaire_team'];
  var head = ['Date','Site','Type','N OR','Chassis','KVPS','Code dommage','Conseiller','Email','Kilometrage','Statut','Commentaire'];
  var esc2 = function(v){ v = String(v==null?'':v).replace(/"/g,'""'); return '"'+v+'"'; };
  var csv = head.map(esc2).join(';') + '\r\n';
  rows.forEach(function(d){ csv += cols.map(function(c){ return esc2(d[c]); }).join(';') + '\r\n'; });
  var blob = new Blob(['\ufeff'+csv], {type:'text/csv;charset=utf-8;'}); // BOM pour Excel
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'historique_'+fT+'_'+(fS||'tous')+'_'+new Date().toISOString().slice(0,10)+'.csv';
  document.body.appendChild(a); a.click();
  setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
  toast('✔ Export CSV ('+rows.length+' demande(s)).');
}

// Indicateur de progression : compte les champs requis remplis (adapté Kulanz/CCR)
function updateFormProgress() {
  var bar = ge('form-progress-bar'); if (!bar) return;
  var isCCR = (ge('f-type') && ge('f-type').value === 'CCR');
  // Champs requis communs
  var checks = [
    !!(ge('f-site') && ge('f-site').value),
    isValidVIN(gv('chassis')),
    /^\d{6}$/.test(gv('or_number')),
    !!gv('plainte_client'),
    !!(ge('desig-val') && ge('desig-val').value),
    !!(ge('dom-val') && ge('dom-val').value),
    !!(ge('ava-val') && ge('ava-val').value),
    !!gv('conseiller_client'),
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(gv('email_usager'))
  ];
  if (isCCR) {
    checks.push(!!gr('elsa_dispo'));
    checks.push(/^\d{9}$/.test(gv('iq_num')));
    checks.push(!!(ge('chk-engagement') && ge('chk-engagement').checked));
  }
  var done = checks.filter(Boolean).length;
  var total = checks.length;
  var pct = total ? Math.round(done/total*100) : 0;
  bar.style.width = pct + '%';
  bar.style.background = (pct===100) ? 'var(--green,#0B7A6E)' : 'var(--accent)';
  var lbl = ge('form-progress-label'); if (lbl) lbl.textContent = 'Champs requis : ' + done + ' / ' + total;
  var pc  = ge('form-progress-pct');   if (pc)  pc.textContent = pct + ' %';
}

function setHistoType(type) {
  G.histoType = type;
  var k = ge('htab-kulanz'), c = ge('htab-ccr');
  if (k) { var aK = (type==='Kulanz');
    k.style.background = aK ? 'var(--accent)' : 'var(--card)';
    k.style.color      = aK ? '#fff' : 'var(--ink)';
    k.classList.toggle('active', aK);
  }
  if (c) { var aC = (type==='CCR');
    c.style.background = aC ? 'var(--accent)' : 'var(--card)';
    c.style.color      = aC ? '#fff' : 'var(--ink)';
    c.classList.toggle('active', aC);
  }
  renderHisto();
}

// Assigner un responsable (impression / traitement CCR) depuis le tableau
function changerResponsable(id, resp) {
  if (G.role !== 'team') return;
  var d = G.demandes.find(function(x) { return x.id == id; });
  if (!d) return;
  d.responsable = resp;
  var key = 'd' + String(d.id).replace(/[^a-zA-Z0-9]/g, '');
  var save = demandesRef ? demandesRef.child(key).update({ responsable: resp }) : Promise.resolve();
  Promise.resolve(save).then(function() {
    toast(resp ? ('✔ Responsable : ' + resp) : '✔ Responsable retiré');
  }).catch(function(err) {
    console.warn('Responsable:', err);
    toast('❌ Erreur.');
  });
}

// Changement de statut directement depuis le tableau (CCR uniquement)
function changerStatutLigne(id, nouveauStatut) {
  if (G.role !== 'team') return;
  var d = G.demandes.find(function(x) { return x.id == id; });
  if (!d) return;
  var ancienStatut = d.statut;
  var envoieMail = (CCR_MAIL.indexOf(nouveauStatut) !== -1);

  if (envoieMail) {
    if (!confirm('Passer la demande au statut « ' + nouveauStatut + ' » ?\n\nUn e-mail sera préparé pour l\'usager.')) {
      renderHisto();
      return;
    }
  }

  d.statut = nouveauStatut;
  var update = { statut: nouveauStatut };
  var key = 'd' + String(d.id).replace(/[^a-zA-Z0-9]/g, '');
  var save = demandesRef ? demandesRef.child(key).update(update) : Promise.resolve();

  Promise.resolve(save).then(function() {
    renderHisto(); if (G.role === 'team') renderDash();
    if (envoieMail) {
      var commerce = d.commerce || null;
      toast('✔ ' + nouveauStatut + ' — préparation du mail…');
      if (typeof envoyerMailKulanz === 'function') envoyerMailKulanz(d, nouveauStatut, d.commentaire_team || '', commerce);
    } else {
      toast('✔ Statut : ' + nouveauStatut);
    }
  }).catch(function(err) {
    console.warn('Changement statut:', err);
    d.statut = ancienStatut;
    renderHisto();
    toast('❌ Erreur lors du changement de statut.');
  });
}

function renderHisto() {
  if (typeof checkDocRequise === 'function') checkDocRequise();
  // filtre site via G.site (TeamGarantie: via f-site, usager: son site)
  var fS  = G.role==='usager' ? G.site : ge('f-site').value;
  var fT  = G.histoType || 'Kulanz';   // onglet actif Kulanz / CCR
  var fSt = ge('f-stat-sel')  ? ge('f-stat-sel').value  : '';
  var mode = G.histoMode || 'pending';
  // Un dossier est "à traiter" si En attente ou Complément requis ; sinon "traité"
  var isPending = function(d){ return !statutEstTraite(d.statut); };
  var inMode = function(d){ return mode==='pending' ? isPending(d) : !isPending(d); };

  // Titre + colonne d'action selon le mode
  var titleEl = ge('histo-title');
  if (titleEl) titleEl.textContent = (mode==='pending') ? 'Demandes à traiter' : 'Historique (demandes traitées)';

  // Stats calculées sur le type actif (+ site, + mode)
  var scope = G.demandes.filter(function(d) {
    return d.type===fT && (!fS || d.site===fS) && inMode(d);
  });

  var el = function(id,val) { var e=ge(id); if(e) e.textContent=val; };
  el('s-total', scope.length);
  el('s-wait',  scope.filter(function(d){return d.statut==='En attente';}).length);
  el('s-ok',    scope.filter(function(d){return d.statut==='Traitée';}).length);
  el('s-no',    scope.filter(function(d){return d.statut==='Traitée sans participation';}).length);

  // Compteurs sur les onglets Kulanz/CCR (selon le mode courant)
  var siteScope = G.demandes.filter(function(d){ return (!fS || d.site===fS) && inMode(d); });
  var cntK = siteScope.filter(function(d){ return d.type==='Kulanz'; }).length;
  var cntC = siteScope.filter(function(d){ return d.type==='CCR'; }).length;
  var ck1 = ge('htab-kulanz-cnt'); if (ck1) ck1.textContent = cntK ? '('+cntK+')' : '';
  var cc1 = ge('htab-ccr-cnt');    if (cc1) cc1.textContent = cntC ? '('+cntC+')' : '';

  // Badge sur l'onglet "Demandes" : total en attente (tous types, site filtré)
  var pendingTotal = G.demandes.filter(function(d){ return (!fS||d.site===fS) && isPending(d); }).length;
  var tdc = ge('tab-demandes-cnt'); if (tdc) tdc.textContent = pendingTotal ? '('+pendingTotal+')' : '';

  // Recherche texte (châssis, OR, conseiller, code dommage)
  var q = (ge('f-search') ? ge('f-search').value : '').toLowerCase().trim();

  var filtered = G.demandes.filter(function(d) {
    if (d.type!==fT) return false;
    if (!inMode(d)) return false;
    if (fS && d.site!==fS) return false;
    if (fSt && d.statut!==fSt) return false;
    if (q) {
      var hay = ((d.chassis||'')+' '+(d.or||'')+' '+(d.conseiller_client||'')+' '+(d.code_dommage||'')).toLowerCase();
      if (hay.indexOf(q)===-1) return false;
    }
    return true;
  });

  // Tri
  var sk = G.histoSort.key, sdir = (G.histoSort.dir==='asc'?1:-1);
  filtered.sort(function(a,b){
    var va, vb;
    if (sk==='or')      { va=parseInt(a.or)||0; vb=parseInt(b.or)||0; }
    else if (sk==='date'){ va=String(a.id); vb=String(b.id); } // id = timestamp, tri fiable
    else                { va=String(a[sk]||'').toLowerCase(); vb=String(b[sk]||'').toLowerCase(); }
    if (va<vb) return -1*sdir; if (va>vb) return 1*sdir; return 0;
  });
  // Indicateurs de tri dans les en-têtes
  ['date','site','or','statut'].forEach(function(k){
    var s=ge('sort-'+k); if(s) s.textContent = (sk===k) ? (G.histoSort.dir==='asc'?'▲':'▼') : '';
  });

  var _bv=ge('btn-vider-histo'); if(_bv) _bv.style.display=(G.role==='team'?'':'none');
  var _ex=ge('btn-export-csv');  if(_ex) _ex.style.display=(G.role==='team'?'':'none');
  var tbody = ge('histo-body');
  var empty = ge('histo-empty');
  if (!tbody) return;
  if (!filtered.length) { tbody.innerHTML=''; if(empty) empty.style.display='block'; return; }
  if (empty) empty.style.display='none';

  tbody.innerHTML = filtered.map(function(d) {
    var _si  = statutInfo(d.statut);
    var bc   = _si.badge;
    var ic   = _si.icon;
    var pec  = '—';
    if (d.statut==='Traitée' && d.commerce) {
      var c=d.commerce, pts=[];
      if(c.mo_de)  pts.push('<span>MO: '+esc(c.mo_de)+'%</span>');
      if(c.pi_de)  pts.push('<span>Pièces: '+esc(c.pi_de)+'%</span>');
      if(c.moe_de) pts.push('<span>MO ext.: '+esc(c.moe_de)+'%</span>');
      if(c.pe_de)  pts.push('<span>Pièces ext.: '+esc(c.pe_de)+'%</span>');
      if(pts.length) pec='<div style="font-size:11px;line-height:1.7">'+pts.join('')+'</div>';
    }
    var _traitee = statutEstTraite(d.statut);
    var _btnLabel = _traitee ? '✓ Validée'
      : (d.statut === 'Complément requis' ? 'À compléter' : 'Valider');
    var _btnStyle = _traitee
      ? 'background:var(--green,#0B7A6E);'
      : (d.statut === 'Complément requis' ? 'background:var(--amber,#B26A00);' : '');
    var action = G.role==='team'
      ? '<button class="btn-val" data-id="'+esc(String(d.id))+'" style="'+_btnStyle+'" onclick="event.stopPropagation();openSPFromBtn(this)">'+_btnLabel+'</button>'
      : '<span style="font-size:11px;color:var(--accent-d);font-weight:600">Ouvrir ›</span>';
    return '<tr style="cursor:pointer" onclick="histoRowClick(\''+esc(String(d.id))+'\')" title="Cliquer pour ouvrir">'+
      '<td>'+esc(d.date||'')+'</td>'+
      '<td style="font-weight:500">'+esc(d.site||'')+'</td>'+
      '<td><span style="font-size:11px;font-weight:600;color:var(--gold)">'+esc(d.type||'')+'</span></td>'+
      '<td style="font-family:monospace">'+esc(d.or||'')+'</td>'+
      '<td style="font-family:monospace;font-size:11px">'+esc(d.chassis||'')+'</td>'+
      '<td style="font-size:11px">'+esc(d.code_dommage||'')+'</td>'+
      '<td>'+(
        (d.type==='CCR' && G.role==='team')
        ? '<select class="row-statut badge '+bc+'" data-id="'+esc(String(d.id))+'" onclick="event.stopPropagation()" onchange="changerStatutLigne(\''+esc(String(d.id))+'\',this.value)" style="font-size:11.5px;padding:5px 8px;border-radius:8px;cursor:pointer;font-weight:600">'
          + STATUTS_ORDRE_CCR.map(function(st){
              var inf=statutInfo(st);
              return '<option value="'+esc(st)+'"'+(st===d.statut?' selected':'')+'>'+inf.icon+' '+esc(st)+'</option>';
            }).join('')
          + '</select>'
        : '<span class="badge '+bc+'" style="font-size:12px;padding:5px 10px">'+ic+' '+esc(d.statut||'')+'</span>'
      )+'</td>'+
      '<td>'+(
        (d.type==='CCR' && G.role==='team')
        ? '<select class="row-resp" data-id="'+esc(String(d.id))+'" onclick="event.stopPropagation()" onchange="changerResponsable(\''+esc(String(d.id))+'\',this.value)" style="font-size:11.5px;padding:4px 6px;border-radius:6px;cursor:pointer;border:1px solid var(--line,#E7E2D7)">'
          + RESPONSABLES.map(function(rp){
              return '<option value="'+esc(rp)+'"'+(rp===(d.responsable||'')?' selected':'')+'>'+(rp||'—')+'</option>';
            }).join('')
          + '</select>'
        : '<span style="font-size:11px;color:#666">'+esc(d.responsable||'—')+'</span>'
      )+'</td>'+
      '<td>'+pec+'</td>'+
      '<td style="font-size:11px;color:#666;max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+esc(d.commentaire_team||'')+'">'+esc(d.commentaire_team||'—')+'</td>'+
      '<td>'+action+'</td>'+
    '</tr>';
  }).join('');
}

function viderHistorique() {
  if (G.role !== 'team') { toast('⚠ Réservé à TeamGarantie.'); return; }
  var m = ge('vider-modal');
  if (!m) return;
  // Reset à l'étape 1
  var s1 = ge('vm-step1'); if(s1) { s1.classList.add('active'); }
  var s2 = ge('vm-step2'); if(s2) { s2.classList.remove('active'); }
  var pe = ge('vider-pwd-err'); if(pe) pe.style.display = 'none';
  var pi = ge('vider-pwd'); if(pi) pi.value = '';
  var ob = ge('vider-ok-btn'); if(ob) ob.disabled = false;
  var _sl=ge('vm-site-label');
  if(_sl){
    var _fs2=ge('f-site')?ge('f-site').value:'';
    _sl.textContent=_fs2?'Site concerné : '+_fs2:'⚠ Sélectionnez un site';
    _sl.style.color=_fs2?'var(--gold)':'#c0392b';
  }
  m.classList.add('open');
}

function closeViderModal() {
  var m = ge('vider-modal'); if(m) m.classList.remove('open');
  var pi = ge('vider-pwd'); if(pi) pi.value = '';
  var pe = ge('vider-pwd-err'); if(pe) pe.style.display = 'none';
  var ob = ge('vider-ok-btn'); if(ob) ob.disabled = false;
}

function viderStep2() {
  // Passer à l'étape mot de passe
  var s1 = ge('vm-step1'); if(s1) s1.classList.remove('active');
  var s2 = ge('vm-step2'); if(s2) s2.classList.add('active');
  setTimeout(function() { var pi = ge('vider-pwd'); if(pi) pi.focus(); }, 100);
}

function viderConfirm() {
  var ob = ge('vider-ok-btn');
  if (ob && ob.disabled) return;
  var pi = ge('vider-pwd');
  if (!pi || pi.value !== MOT_DE_PASSE) {
    var pe = ge('vider-pwd-err'); if(pe) pe.style.display = 'block';
    if(pi) pi.focus();
    return;
  }
  if(ob) ob.disabled = true;
  var pe = ge('vider-pwd-err'); if(pe) pe.style.display = 'none';
  if (demandesRef) {
    var _fs=ge('f-site')?ge('f-site').value:'';
    if(!_fs){toast('⚠ Sélectionnez un site à vider.');closeViderModal();return;}
    var _td=G.demandes.filter(function(d){return d.site===_fs;});
    if(!_td.length){toast('✔ Aucune demande pour '+_fs+'.');closeViderModal();return;}
    Promise.all(_td.map(function(d){
      return demandesRef.child('d'+String(d.id).replace(/[^a-zA-Z0-9]/g,'')).remove();
    })).then(function(){
      G.demandes=G.demandes.filter(function(d){return d.site!==_fs;});
      closeViderModal();renderHisto();renderDash();
      toast('✔ '+_td.length+' demande(s) de '+_fs+' supprimée(s).');
      })
      .catch(function() {
        closeViderModal();
        toast('❌ Erreur lors de la suppression.');
      });
  } else {
    G.demandes = [];
    closeViderModal();
    renderHisto();
    toast('🗑 Historique local supprimé.');
  }
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// DASHBOARD TEAM
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function renderDash() {
  var grid = ge('dash-grid');
  if (!grid || G.role !== 'team') return;
  if (!G.demandes) G.demandes = [];
  var totalWait = 0;
  var html = '';
  var curFilter = ge('f-site').value || '';
  SITES.forEach(function(site) {
    var sd    = G.demandes.filter(function(d) { return d.site===site; });
    var total = sd.length;
    var wait  = sd.filter(function(d) { return d.statut==='En attente'; }).length;
    var valid = sd.filter(function(d) { return d.statut==='Traitée'; }).length;
    totalWait += wait;
    var cls = 'd-card' + (wait>0?' pending':'') + (curFilter===site?' sel':'');
    // Utiliser data-site pour éviter les problèmes de quotes
    html += '<div class="'+cls+'" data-site="'+esc(site)+'" onclick="dashClick(this)">'+
      '<div class="d-name">'+esc(site)+'</div>'+
      '<div class="d-nums">'+
        '<div class="d-num"><span class="d-val dv-total">'+total+'</span><span class="d-lbl">Total</span></div>'+
        '<div class="d-num"><span class="d-val dv-wait">'+wait+'</span><span class="d-lbl">Attente</span></div>'+
        '<div class="d-num"><span class="d-val dv-ok">'+valid+'</span><span class="d-lbl">Validées</span></div>'+
      '</div>'+
      '<div class="d-dot'+(wait>0?' w':total>0?' ok':'')+'"></div>'+
    '</div>';
  });
  grid.innerHTML = html;
  var alert = ge('h-alert');
  var atxt  = ge('h-alert-txt');
  if (alert) {
    if (totalWait > 0) {
      alert.classList.add('on');
      if (atxt) atxt.textContent = totalWait+' demande'+(totalWait>1?'s':'')+' en attente';
    } else {
      alert.classList.remove('on');
    }
  }
}

function dashClick(el) {
  var site = el.getAttribute('data-site');
  // Toggle: si déjà sélectionné, déselectionner
  var curSite = ge('f-site').value;
  var newSite = (curSite === site) ? '' : site;
  // Mettre à jour site actif (pour TeamGarantie, G.site reste '')
  ge('f-site').value = newSite;
  ge('h-site-name').textContent = newSite || 'Tous les sites';
  // Synchroniser site-bar boutons
  [].forEach.call(document.querySelectorAll('.s-btn'), function(b) {
    b.classList.toggle('active', b.textContent.trim() === newSite);
  });
  // Basculer sur la file "Demandes à traiter" (mode pending)
  [].forEach.call(document.querySelectorAll('.page'), function(p) { p.classList.remove('active'); });
  [].forEach.call(document.querySelectorAll('.nav-tab'), function(t) { t.classList.remove('active'); });
  G.histoMode = 'pending';
  ge('page-histo').classList.add('active');
  if (ge('tab-demandes')) ge('tab-demandes').classList.add('active');
  ge('type-bar').style.display = 'none';
  renderHisto();
  renderDash();
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// PANNEAU VALIDATION
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function openSPFromBtn(btn) {
  var id = btn.getAttribute('data-id');
  openSP(id);
}

// Clic sur une ligne d'historique :
//  - mode "à traiter" + TeamGarantie -> ouvre directement la fenêtre de validation
//  - sinon -> rouvre la demande (consultation / édition / duplication)
function histoRowClick(id) {
  if (G.histoMode === 'pending' && G.role === 'team') {
    if (confirm('Voulez-vous modifier cette demande ?\n\nOK     → ouvrir le formulaire pour corriger et enregistrer (sans envoi de mail)\nAnnuler → ne rien faire')) {
      G.editOnly = true;       // édition seule : enregistre sans envoyer de mail
      openDemande(id);
    }
  } else {
    G.editOnly = false;
    openDemande(id);
  }
}

// Retrouve une demande par id (compare en chaîne)
function getDemandeById(id) {
  for (var i = 0; i < G.demandes.length; i++) {
    if (String(G.demandes[i].id) === String(id)) return G.demandes[i];
  }
  return null;
}

// Rouvre une demande depuis l'historique dans le formulaire.
//  - "En attente" / "Complément requis" -> édition : l'envoi MET À JOUR la même demande.
//  - "Traitée" / "Traitée sans participation" -> pré-rempli : l'envoi crée une NOUVELLE demande (duplication).
function openDemande(id) {
  var d = getDemandeById(id);
  if (!d) { toast('⚠ Demande introuvable.'); return; }
  G.reopenId = String(id);

  var statut = d.statut || 'En attente';
  var estFinalisee = statutEstTraite(statut);

  // Remettre le formulaire à zéro puis le repeupler
  if (ge('mainForm')) ge('mainForm').reset();
  G.editingId = null;
  resetCat();
  ssReset('dom'); ssReset('ava'); ssReset('rub'); ssResetDesig();
  setType(d.type === 'CCR' ? 'C' : 'K');

  fillFormFromRecord(d);

  // Mode : duplication (finalisée) ou modification (en cours)
  // En mode "editOnly" (clic ligne TeamGarantie), on force la modification de CETTE demande.
  G.editingId = (G.editOnly || !estFinalisee) ? String(id) : null;

  // Aller sur l'onglet formulaire
  showPage('form', ge('tab-form'));

  // Bandeau d'information en haut du formulaire
  showReopenBanner(G.editOnly ? false : estFinalisee, d);

  // Mettre à jour le libellé du bouton d'envoi
  var bv = ge('btn-envoyer');
  if (bv) {
    var lbl = G.editOnly ? 'Enregistrer les modifications'
            : (estFinalisee ? 'Créer une nouvelle demande' : 'Mettre à jour la demande');
    var svg = bv.querySelector('svg');
    bv.innerHTML = (svg ? svg.outerHTML : '') + ' ' + lbl;
  }
  // Second bouton "Enregistrer les modifications" : seulement quand une demande finalisée
  // est rouverte (permet de MODIFIER la demande existante au lieu d'en créer une nouvelle)
  var bem = ge('btn-enregistrer-modifs');
  if (bem) bem.style.display = (!G.editOnly && estFinalisee) ? 'inline-flex' : 'none';

  toast(G.editOnly ? '✏ Modification — enregistrez sans envoi de mail.'
        : (estFinalisee ? '📄 Demande dupliquée — ajustez puis envoyez.' : '✏ Demande rouverte en modification.'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Enregistrer les modifications sur la demande existante (au lieu d'en créer une nouvelle)
// Utilisé quand une demande finalisée est rouverte et qu'on veut juste corriger
// (ex : code dommage / code avarie) sans créer de doublon ni renvoyer de mail.
function enregistrerModifsExistante() {
  var id = G.activeId || G.reopenId;
  if (!id) { toast('Aucune demande à modifier.'); return; }
  G.editOnly = true;
  G.editingId = String(id);
  envoyerFormulaire(); // passe dans la branche editOnly (met à jour, sans mail)
}

function enregistrerModifsExistante_END() {}

// Affiche/actualise un bandeau au-dessus du formulaire
function showReopenBanner(estFinalisee, d) {

  var host = ge('mainForm');
  if (!host) return;
  var old = ge('reopen-banner'); if (old) old.remove();
  var div = document.createElement('div');
  div.id = 'reopen-banner';
  if (estFinalisee) {
    div.className = 'info-box';
    div.style.cssText = 'background:var(--info-soft);border:1px solid var(--info-line);color:var(--info);margin-bottom:14px';
    div.innerHTML = '📄 <strong>Duplication</strong> — basée sur la demande '
      + esc(d.type||'') + ' du ' + esc(d.date||'') + ' (' + esc(d.statut||'') + '). '
      + 'À l\'envoi, une <strong>nouvelle demande</strong> sera créée. '
      + '<button type="button" onclick="annulerReouverture()" style="background:none;border:none;color:var(--info);text-decoration:underline;cursor:pointer;font-size:12px;padding:0;margin-left:6px">Annuler</button>';
  } else {
    div.className = 'info-box';
    div.style.cssText = 'background:var(--amber-soft);border:1px solid var(--amber-line);color:var(--amber);margin-bottom:14px';
    if (G.editOnly) {
      div.innerHTML = '✏ <strong>Modification</strong> — demande ' + esc(d.type||'') + ' du ' + esc(d.date||'')
        + ' (' + esc(d.statut||'') + '). En enregistrant, cette demande sera <strong>mise à jour sans envoi de mail</strong>. '
        + '<button type="button" onclick="annulerReouverture()" style="background:none;border:none;color:var(--amber);text-decoration:underline;cursor:pointer;font-size:12px;padding:0;margin-left:6px">Annuler</button>';
    } else {
      div.innerHTML = '✏ <strong>Modification</strong> — demande ' + esc(d.type||'') + ' du ' + esc(d.date||'')
        + ' (' + esc(d.statut||'') + '). À l\'envoi, cette demande sera <strong>mise à jour</strong>. '
        + '<button type="button" onclick="annulerReouverture()" style="background:none;border:none;color:var(--amber);text-decoration:underline;cursor:pointer;font-size:12px;padding:0;margin-left:6px">Annuler</button>';
    }
  }
  host.insertBefore(div, host.firstChild);
}

function clearReopenBanner() {
  var b = ge('reopen-banner'); if (b) b.remove();
  var bem = ge('btn-enregistrer-modifs'); if (bem) bem.style.display = 'none';
}

// Annule la réouverture : repart sur un formulaire vierge
function annulerReouverture() {
  G.editingId = null;
  G.editOnly = false;
  clearReopenBanner();
  if (typeof nouvelleDemande === 'function') nouvelleDemande();
  toast('Réouverture annulée.');
}

function openSP(id) {
  G.activeId = id;
  var d = G.demandes.find(function(x) { return x.id == id; });
  if (!d) return;
  var delBtn = ge('sp-del-btn'); if (delBtn) delBtn.style.display = (G.role === 'team') ? '' : 'none';
  var setText = function(elId, val) { var e=ge(elId); if(e) e.textContent=val||'—'; };
  setText('sp-sub',d.type+' — OR '+d.or+' — '+d.date);
  setText('sp-sub',     d.type+' — OR '+d.or+' — '+d.date);
  setText('sp-site',    d.site);
  setText('sp-type',    d.type);
  setText('sp-or',      d.or);
  setText('sp-chassis', d.chassis);
  setText('sp-km',      d.kilometrage ? d.kilometrage+' km' : '');
  setText('sp-dom',     d.code_dommage);
  setText('sp-ava',     (d.ava_code ? d.ava_code + (d.ava_lbl ? ' — '+d.ava_lbl : '') : ''));
  setText('sp-date',    d.date);

  // Vérifications KULANZ (réponses du demandeur) — uniquement pour les demandes Kulanz
  var ksec = ge('sp-kulanz-sec');
  var klist = ge('sp-kulanz-list');
  if (ksec && klist) {
    if (d.type === 'Kulanz') {
      var brandK = SITE_BRAND[d.site] || 'VW';
      var qs = KULANZ_BY_BRAND[brandK] || KULANZ_BY_BRAND['VW'];
      var rows = '';
      qs.forEach(function(q) {
        var val = d['k_'+q.name];
        if (val === undefined || val === null || val === '') return; // non répondu : on saute
        // Couleur : rouge si réponse NOK, vert sinon
        var isNok = (q.nok && val === q.nok);
        var color = isNok ? 'var(--red,#c0392b)' : 'var(--green,#0B7A6E)';
        rows += '<div style="display:flex;justify-content:space-between;gap:10px;padding:2px 0;border-bottom:1px solid var(--line,#eee)">'
              + '<span style="color:#555">' + esc(q.label) + '</span>'
              + '<strong style="color:'+color+';white-space:nowrap">' + esc(val) + '</strong></div>';
        if (q.name === 'tpi' && val === 'OUI' && d.num_tpi) {
          rows += '<div style="display:flex;justify-content:space-between;gap:10px;padding:2px 0;border-bottom:1px solid var(--line,#eee)">'
                + '<span style="color:#555">N° TPI</span><strong>' + esc(d.num_tpi) + '</strong></div>';
        }
      });
      if (d.num_tpi && rows.indexOf('N° TPI')===-1) {
        rows += '<div style="display:flex;justify-content:space-between;gap:10px;padding:2px 0"><span style="color:#555">N° TPI</span><strong>'+esc(d.num_tpi)+'</strong></div>';
      }
      klist.innerHTML = rows || '<span style="color:#999">Aucune réponse enregistrée.</span>';
      ksec.style.display = 'block';
    } else {
      ksec.style.display = 'none';
    }
  }
  var stat = ge('sp-statut');
  // Remplir le menu selon le type (CCR = workflow dédié, Kulanz = statuts classiques)
  remplirStatutsOptions(d.type, d.statut);
  if (stat) stat.value = d.statut || (d.type === 'CCR' ? 'Demande envoyée' : 'En attente');
  var cmt = ge('sp-comment');
  if (cmt) cmt.value = d.commentaire_team || '';
  var resp = ge('sp-responsable');
  if (resp) resp.value = d.responsable || '';
  var err = ge('sp-pwd-err');
  if (err) err.style.display = 'none';
  var c = d.commerce || {};
  ['mo','pi','moe','pe'].forEach(function(k) {
    var el = ge('c-'+k); if (el) el.value = c[k+'_de'] || '';
  });
  var ext = ge('c-type-ext');
  if (ext) ext.value = c.type_ext || '';
  var okBtn = ge('sp-ok-btn');
  if (okBtn) okBtn.disabled = false;
  onStatutChange();
  var spOv = ge('sp-overlay'); if(spOv) spOv.classList.add('open');
  var spPn = ge('side-panel'); if(spPn) spPn.classList.add('open');
  setTimeout(function() { var c=ge('sp-statut'); if(c) c.focus(); }, 350);
}

function closeSP() {
  var spOv2 = ge('sp-overlay'); if(spOv2) spOv2.classList.remove('open');
  var spPn2 = ge('side-panel'); if(spPn2) spPn2.classList.remove('open');
  G.activeId = null;
  var okBtn = ge('sp-ok-btn'); if (okBtn) okBtn.disabled = false;
}

function onStatutChange() {
  var s = ge('sp-statut');
  var c = ge('sp-commerce');
  if (!s) return;
  // Participation commerciale : uniquement pour les statuts avec PEC/participation
  var showCommerce = (s.value === 'Traitée' || s.value === 'Validée CCR');
  if (c) c.style.display = showCommerce ? 'block' : 'none';
  // Bouton étape suivante : visible tant qu'il reste une étape dans le workflow CCR
  var nb = ge('sp-next-step');
  if (nb) {
    var idx = CCR_WORKFLOW.indexOf(s.value);
    var showNext = (idx !== -1 && idx < CCR_WORKFLOW.length - 1);
    // depuis la dernière étape workflow (en attente VGF) → proposer les statuts finaux via le menu, pas le bouton
    nb.style.display = showNext ? 'block' : 'none';
    if (showNext) {
      var next = CCR_WORKFLOW[idx + 1];
      nb.textContent = '➡️ ' + next;
    }
  }
}

// Remplit le menu déroulant des statuts selon le type de demande
function remplirStatutsOptions(type, current) {
  var s = ge('sp-statut');
  if (!s) return;
  var list;
  if (type === 'CCR') {
    list = CCR_WORKFLOW.concat(CCR_FINAUX).concat(['Complément requis']);
  } else {
    list = ['En attente', 'Traitée', 'Traitée sans participation', 'Complément requis'];
  }
  // s'assurer que le statut courant est présent
  if (current && list.indexOf(current) === -1) list.unshift(current);
  s.innerHTML = list.map(function(st) {
    var info = statutInfo(st);
    return '<option value="' + esc(st) + '">' + info.icon + ' ' + esc(st) + '</option>';
  }).join('');
}

// Bouton "étape suivante" : avance d'un cran dans le workflow CCR
function etapeSuivanteCCR() {
  var s = ge('sp-statut');
  if (!s) return;
  var idx = CCR_WORKFLOW.indexOf(s.value);
  if (idx !== -1 && idx < CCR_WORKFLOW.length - 1) {
    s.value = CCR_WORKFLOW[idx + 1];
    onStatutChange();
  }
}

// Effacer une demande (TeamGarantie uniquement) : PIN + double confirmation
function supprimerDemande() {
  if (G.role !== 'team') { toast('Réservé à la TeamGarantie.'); return; }
  var d = G.demandes.find(function(x) { return x.id == G.activeId; });
  if (!d) { toast('Demande introuvable.'); return; }
  // 1) Confirmation
  if (!confirm('Vous êtes sûr d\'effacer la demande ?\n\n' + (d.type||'') + ' — OR ' + (d.or||'') + ' — ' + (d.site||'') + '\n\nCette action est définitive.')) return;
  // 2) Code PIN
  var pin = prompt('Saisissez le code PIN pour confirmer la suppression :');
  if (pin === null) return; // annulé
  if (pin !== MOT_DE_PASSE) { toast('❌ Code PIN incorrect.'); return; }
  // 3) Suppression Firebase
  var key = 'd' + String(d.id).replace(/[^a-zA-Z0-9]/g, '');
  var del = demandesRef ? demandesRef.child(key).remove()
    : (function(){ var i=G.demandes.findIndex(function(x){return x.id==d.id;}); if(i!==-1) G.demandes.splice(i,1); return Promise.resolve(); })();
  Promise.resolve(del).then(function() {
    G.demandes = G.demandes.filter(function(x){ return x.id != d.id; });
    closeSP(); renderHisto(); if (G.role==='team') renderDash();
    toast('🗑 Demande effacée.');
  }).catch(function(err) {
    console.warn('Suppression:', err);
    toast('❌ Erreur lors de la suppression.');
  });
}

function validerSP() {
  var okBtn = ge('sp-ok-btn');
  if (okBtn && okBtn.disabled) return;
  // Vérifier que l'utilisateur est connecté via Firebase Auth comme TeamGarantie
  var currentUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
  if (!currentUser || !isTeamEmail(currentUser.email)) {
    ge('sp-pwd-err').textContent = 'Session expirée. Reconnectez-vous.';
    ge('sp-pwd-err').style.display = 'block';
    return;
  }
  ge('sp-pwd-err').style.display = 'none';
  if (okBtn) okBtn.disabled = true;

  var statut     = ge('sp-statut').value;
  var commentaire = ge('sp-comment').value.trim();
  var commerce = {
    mo_de:  ge('c-mo')  ? ge('c-mo').value  : '',
    pi_de:  ge('c-pi')  ? ge('c-pi').value  : '',
    moe_de: ge('c-moe') ? ge('c-moe').value : '',
    pe_de:  ge('c-pe')  ? ge('c-pe').value  : '',
    type_ext: ge('c-type-ext') ? ge('c-type-ext').value.trim() : ''
  };

  var d = G.demandes.find(function(x) { return x.id == G.activeId; });
  if (!d) { closeSP(); return; }

  var update = {
    statut: statut,
    commentaire_team: commentaire,
    responsable: ge('sp-responsable') ? ge('sp-responsable').value : (d.responsable||''),
    commerce: (statut==='Traitée' || statut==='Validée CCR') ? commerce : (d.commerce||null)
  };

  var doSave = function() {
    if (demandesRef) {
      var key = 'd'+String(d.id).replace(/[^a-zA-Z0-9]/g,'');
      return demandesRef.child(key).update(update).catch(function(e){console.warn('Firebase update:',e);});
    } else {
      var idx = G.demandes.findIndex(function(x) { return x.id == G.activeId; });
      if (idx !== -1) Object.assign(G.demandes[idx], update);
      return Promise.resolve();
    }
  };

  doSave()
    .then(function() {
      closeSP(); renderHisto(); renderDash();
      toast('✔ Statut mis à jour : '+statut);
      // Envoi mail : CCR → statuts finaux (Validée/sans participation) + Complément requis ; Kulanz → Complément requis, Traitée, Traitée sans participation
      var doitEnvoyer = (d.type === 'CCR')
        ? (CCR_MAIL.indexOf(statut) !== -1)
        : (statut === 'Complément requis' || statut === 'Traitée' || statut === 'Traitée sans participation');
      if (doitEnvoyer) {
        envoyerMailKulanz(d, statut, commentaire, commerce);
      }
    })
    .catch(function(err) {
      console.error(err);
      toast('❌ Erreur Firebase.');
      if (okBtn) okBtn.disabled = false;
    });
}


// ═══════════════════════════════════════════════════════
// ENVOI MAIL KULANZ — avec PDF + sujet structuré
// ═══════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════

// Upload vers Firebase Storage et retourner les URLs
function envoyerMailKulanz(d, statut, commentaire, commerce) {
  if (!d) return;

  // Sujet : Demande Kulanz_VIN_KVPS
  var kvps = d.kvps || KVPS_MAP[d.site] || '';
  var sujet = 'Demande ' + (d.type || 'Kulanz') + '_' + (d.chassis || '') + (kvps ? '_' + kvps : '');

  // Corps du mail
  var sep='━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
  var sep2='─────────────────────────────────────────────────────';
  var statIcon=statut==='Traitée'?'✅':statut==='Traitée sans participation'?'❌':statut==='Complément requis'?'🔄':'🟡';
  var corps=sep+'\n';
  corps+='🔧  DEMANDE '+((d.type||'KULANZ').toUpperCase())+' — '+(d.site||'').toUpperCase()+'\n';
  corps+=sep+'\n\n';
  corps+=statIcon+'  STATUT : '+statut.toUpperCase()+'\n'+sep2+'\n';
  if(commentaire) corps+='  Commentaire    : '+commentaire+'\n';
  if(statut==='Traitée'&&commerce){
    corps+='\n💶  PARTICIPATION COMMERCIALE\n'+sep2+'\n';
    if(commerce.mo_de)  corps+='  MO             : '+commerce.mo_de+' %\n';
    if(commerce.pi_de)  corps+='  Pièces         : '+commerce.pi_de+' %\n';
    if(commerce.moe_de) corps+='  MO Ext         : '+commerce.moe_de+' %\n';
    if(commerce.pe_de)  corps+='  Pièces Ext     : '+commerce.pe_de+' %\n';
  }
  // Légende KULANZ — uniquement sur statut "Traitée" (participation accordée)
  // Mise en évidence maximale en texte brut (pas de couleur/gras possible via mailto)
  if ((d.type||'Kulanz') !== 'CCR' && statut === 'Traitée') {
    corps+='\n'+sep+'\n';
    corps+='⚠️  *** KULANZ APPLICABLE SOUS RÉSERVE QUE LES ENTRETIENS SOIENT À JOUR ***  ⚠️\n';
    corps+=sep+'\n';
  }
  corps+='\n'+sep+'\n';
  corps+='Team Garantie GEA – VW  |  Alsace  |  teamgarantie@geauto.fr\n';
  corps+=sep+'\n';

  // Ouvrir Outlook avec l'email pré-rempli
  var dest = d.email_usager || d.email || '';
  if (!dest) dest = 'teamgarantie@geauto.fr';
  var corpsEnc = encodeURIComponent(corps.substring(0, 1800));
  var sujetEnc = encodeURIComponent(sujet);
  // teamgarantie@geauto.fr en copie (sauf s'il est déjà le destinataire)
  var ccPart = (dest.toLowerCase() !== 'teamgarantie@geauto.fr') ? '&cc=' + encodeURIComponent('teamgarantie@geauto.fr') : '';
  var mailto = 'mailto:' + dest + '?subject=' + sujetEnc + ccPart + '&body=' + corpsEnc;

  ouvrirMailto(mailto);
  toast('✔ Mail préparé dans Outlook — vérifiez avant d\'envoyer');
}

// Ouverture robuste d'un mailto (fiable même après fermeture d'un panneau)
function ouvrirMailto(mailto) {
  setTimeout(function() {
    try {
      var a = document.createElement('a');
      a.href = mailto;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(function(){ if (a.parentNode) a.parentNode.removeChild(a); }, 500);
    } catch (e) {
      // repli : méthode classique
      try { window.location.href = mailto; } catch (e2) { console.warn('mailto:', e2); }
    }
  }, 150);
}


// Notification de statut aux usagers : SUPPRIMÉE volontairement.
// Aucune notification automatique n'est envoyée aux usagers (création ou validation).
// Seule la TeamGarantie est notifiée des nouvelles demandes (Web3Forms / mailto).





// ═══════════════════════════════════════════════════════════
// SÉLECTION CATÉGORIE DOMMAGE
// ═══════════════════════════════════════════════════════════

function resetCascadeBelow(from) { resetBelow(from); }
function resetBelow(from) {
  // from: 'cat' -> efface rub+desig+dom
  //       'rub' -> efface desig+dom (PAS rub)
  //       'desig' -> efface dom seulement
  var levels = ['rub', 'desig', 'dom'];
  var start  = (from === 'cat') ? 0
             : (from === 'rub') ? 1
             : (from === 'desig') ? 2
             : 0;
  var ph = {
    rub:   'Rechercher une rubrique…',
    desig: 'Rechercher une désignation…',
    dom:   'Rechercher par code ou libéllé…'
  };
  for (var i = start; i < levels.length; i++) {
    var k = levels[i];
    ssState[k] = null;
    var valEl = ge(k + '-val');
    if (valEl) { valEl.value = ''; if (valEl.dataset) valEl.dataset.manual = ''; }
    var btnEl = ge('ss-' + k + '-btn');
    if (btnEl) {
      btnEl.classList.remove('filled');
      var t = btnEl.querySelector('.ss-txt');
      if (t) t.textContent = ph[k] || 'Sélectionner…';
    }
    var hEl = ge('ss-' + k + '-hint');
    if (hEl) { hEl.textContent = ''; hEl.className = 'hint'; }
  }
  // Effacer rub-val seulement si on repart de cat
  if (from === 'cat') {
    var rv = ge('rub-val'); if (rv) rv.value = '';
  }
}

function selectCat(btn) {
  [].forEach.call(document.querySelectorAll('.cat-btn'), function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  var cat = btn ? btn.getAttribute('data-cat') : '';
  var ci = ge('dom-cat'); if (ci) ci.value = cat;
  var mr = ge('cat-manual-row'); if (mr) mr.classList.remove('show');
  var hint = ge('cat-hint');
  if (hint) { hint.textContent = '✔ ' + cat; hint.className = 'hint ok'; }
  // Reset toute la cascade sous catégorie
  resetBelow('cat');
  // Réévaluer les critères entretien (bloquants pour Moto/Transmission) + bandeau
  updateEntretienBanner();
  checkKulanzNok();
  toast('✔ ' + cat);
}


function selectCatManual() {
  document.querySelectorAll('.cat-btn:not(.manual)').forEach(function(b){b.classList.remove('active');});
  var mr=ge('cat-manual-row'); if(mr)mr.classList.add('show');
  var mi=ge('cat-manual-inp'); if(mi){mi.value='';mi.focus();}
  var ci=ge('dom-cat'); if(ci)ci.value='';
  // Reset cascade et activer rubrique (liste complète sans filtre)
  ssState['rub']=null; var rv=ge('rub-val'); if(rv)rv.value='';
  ssResetDesig();
  var rubBtn=ge('ss-rub-btn');
  if(rubBtn){
    rubBtn.disabled=false; rubBtn.classList.remove('filled');
    var t=rubBtn.querySelector('.ss-txt');
    if(t)t.textContent='🔍 Sélectionner une rubrique…';
  }
  ssRender('rub','');
}

function catManualConfirm() {
  var mi = ge('cat-manual-inp');
  if(!mi || !mi.value.trim()){ toast('Saisissez une catégorie.'); return; }
  var cat = mi.value.trim();
  var ci = ge('dom-cat'); if(ci) ci.value = cat;
  var hint = ge('cat-hint');
  if(hint){ hint.textContent = '✔ Catégorie libre: '+cat; hint.className = 'hint ok'; }
  var mr = ge('cat-manual-row'); if(mr) mr.classList.remove('show');
  [].forEach.call(document.querySelectorAll('.cat-btn'), function(b){ b.classList.remove('active'); });
  var manBtn = document.querySelector('.cat-btn.manual'); if(manBtn) manBtn.classList.add('active');
  resetCascadeBelow('cat');
  updateEntretienBanner();
  checkKulanzNok();
  toast('✔ Catégorie "'+cat+'" définie');
}



function resetCat() {
  [].forEach.call(document.querySelectorAll('.cat-btn'), function(b){ b.classList.remove('active'); });
  var ci = ge('dom-cat'); if(ci) ci.value = '';
  var mr = ge('cat-manual-row'); if(mr) mr.classList.remove('show');
  var hint = ge('cat-hint'); if(hint){ hint.textContent=''; hint.className='hint'; }
  resetCascadeBelow('cat');
}



// ═══════════════════════════════════════════════════════════
// SAISIE MANUELLE CODES DOM/AVA
// ═══════════════════════════════════════════════════════════
function ssManualInput(key, val) {
  var btn = ge('ss-'+key+'-btn');
  if (btn) btn.classList.toggle('filled', val.trim().length > 0);
}


function ssManualConfirmDesig() {
  var inp = ge('ss-desig-manual');
  if (!inp || !inp.value.trim()) { toast('Saisissez une désignation.'); return; }
  var raw = inp.value.trim();
  var rubVal = ge('rub-val') ? ge('rub-val').value : '';
  var k = rubVal + '|||' + raw;
  var codes = RUB_LABEL_CODES[k] || [];
  if (!codes.length) {
    // Chercher dans toutes les rubriques
    Object.keys(RUB_LABEL_CODES).forEach(function(k2){
      if(k2.split('|||')[1].toLowerCase()===raw.toLowerCase()) codes=codes.concat(RUB_LABEL_CODES[k2]);
    });
  }
  var dv=ge('desig-val'); if(dv){dv.value=raw;dv.dataset.manual='true';}
  ssState['desig']={code:raw,label:raw};
  var btn=ge('ss-desig-btn');
  if(btn){btn.classList.add('filled');var t=btn.querySelector('.ss-txt');if(t)t.textContent=raw;}
  var hint=ge('ss-desig-hint'); if(hint){hint.textContent='✔ '+raw;hint.className='hint ok';}
  var domBtn=ge('ss-dom-btn');
  if(domBtn){domBtn.disabled=false;
    var t2=domBtn.querySelector('.ss-txt');
    if(t2)t2.textContent=codes.length===1?codes[0]:'🔍 '+codes.length+' code(s)…';}
  ssReset('dom'); ssRender('dom','');
  if(codes.length===1){setTimeout(function(){ssPick('dom',codes[0],raw);},50);}
  inp.value=''; ssClose(); saveDraft();
  toast('✔ "'+raw+'" — '+codes.length+' code(s).');
}

function ssManualConfirmRub() {
  var inp = ge('ss-rub-manual');
  if (!inp || !inp.value.trim()) { toast('Saisissez une rubrique.'); return; }
  var raw = inp.value.trim();
  var rv = ge('rub-val'); if(rv) rv.value = raw;
  ssState['rub'] = {code:raw, label:raw};
  var btn=ge('ss-rub-btn');
  if(btn){btn.classList.add('filled');var t=btn.querySelector('.ss-txt');if(t)t.textContent=raw;}
  var hint=ge('ss-rub-hint'); if(hint){hint.textContent='✔ '+raw;hint.className='hint ok';}
  var dBtn=ge('ss-desig-btn');
  if(dBtn){dBtn.disabled=false;var t2=dBtn.querySelector('.ss-txt');
    if(t2)t2.textContent='🔍 Sélectionner une désignation…';}
  ssResetDesig();
  ssState['desig']=null; ssRender('desig','');
  inp.value=''; ssClose(); saveDraft();
  toast('✔ Rubrique "'+raw+'" définie.');
}
function ssManualConfirm(key) {
  var inp = ge('ss-'+key+'-manual');
  if (!inp) return;
  var raw = inp.value.trim();
  if (!raw) { toast('Saisissez un code.'); return; }
  // Valider: au moins 1 char, commence par lettre ou chiffre
  if (!/^[A-Za-z0-9].{0,19}$/.test(raw)) {
    toast('Code invalide — commencez par une lettre ou un chiffre.');
    return;
  }
  // Chercher un libellé dans la liste si code connu
  var items = ssData(key);
  var found = items.find(function(it) {
    return it.code.toLowerCase() === raw.toLowerCase();
  });
  var label = found ? found.label : '(saisie manuelle)';
  ssPick(key, raw.toUpperCase(), label);
  inp.value = '';
  toast('✔ Code ' + raw.toUpperCase() + ' enregistré.');
}


// ═══════════════════════════════════════════════════════════
// FORMULAIRE KULANZ DYNAMIQUE
// ═══════════════════════════════════════════════════════════

function toggleTpiField(show) {
  var f = ge('tpi-num-field'); if(f) f.style.display = show ? 'flex' : 'none';
}



function toggleVenduClient(val) {
  var w = ge('vendu-wrapper');
  if (!w) return;
  if (val === 'NON') {
    w.style.display = 'block';
  } else {
    w.style.display = 'none';
    // Reset les radios vendu_client
    var radios = document.querySelectorAll('[name="vendu_client"]');
    radios.forEach(function(r){ r.checked = false; });
    hideVenduAlert();
  }
}

function showVenduAlert() {
  var el = ge('vendu-alert');
  if (!el) return;
  var site  = ge('f-site') ? ge('f-site').value : '';
  var brand = SITE_BRAND[site] || 'VW';
  var brandKey = brand.toLowerCase();
  if (brandKey.indexOf('skoda') >= 0)      brandKey = 'skoda';
  else if (brandKey.indexOf('audi') >= 0)  brandKey = 'audi';
  else if (brandKey.indexOf('seat') >= 0)  brandKey = 'seat';
  else                                      brandKey = 'vw';

  var msgs = {
    vw:    "Le dernier entretien doit être vendu au client ET réalisé en même temps que la réparation pour maintenir l'éligibilité Kulanz VW.",
    audi:  "Le dernier entretien doit être vendu au client ET réalisé en même temps que la réparation. Il devra être réalisé chez Audi pour bénéficier des participations commerciales constructeur.",
    seat:  "Le dernier entretien doit être vendu au client ET réalisé en même temps que la réparation. Il devra être réalisé chez SEAT ou CUPRA pour bénéficier des participations commerciales.",
    skoda: "Le dernier entretien doit être vendu au client ET réalisé en même temps que la réparation selon les préconisations constructeur Skoda."
  };
  var msg = msgs[brandKey] || msgs.vw;

  el.style.display = 'block';
  el.innerHTML = '<div class="info-box" style="background:rgba(192,57,43,.07);border-color:rgba(192,57,43,.3);color:#8b1a1a;margin-top:4px">'
    + '⚠️ <strong>Attention</strong> — ' + msg
    + '</div>';
}

function hideVenduAlert() {
  var el = ge('vendu-alert');
  if (el) { el.style.display = 'none'; el.innerHTML = ''; }
}


function enableAllDropdowns() {
  // Activer rubrique (liste complète)
  var rubBtn = ge('ss-rub-btn');
  if (rubBtn) {
    rubBtn.disabled = false;
    var rt = rubBtn.querySelector('.ss-txt');
    if (rt) rt.textContent = '🔍 Rechercher une rubrique…';
  }
  // Activer désignation (liste complète)
  var desigBtn = ge('ss-desig-btn');
  if (desigBtn) {
    desigBtn.disabled = false;
    var dt = desigBtn.querySelector('.ss-txt');
    if (dt) dt.textContent = '🔍 Rechercher une désignation…';
  }
  // Activer code dommage (liste complète)
  var domBtn = ge('ss-dom-btn');
  if (domBtn) {
    domBtn.disabled = false;
    var dmt = domBtn.querySelector('.ss-txt');
    if (dmt) dmt.textContent = '🔍 Rechercher par code ou libellé…';
  }
}

function renderKulanzForm(site) {
  var zone = ge('kulanz-questions');
  if (!zone) return;

  var brand = SITE_BRAND[site] || 'VW';
  var questions = KULANZ_BY_BRAND[brand] || KULANZ_BY_BRAND['VW'];

  var title = ge('kulanz-title');
  if (title) title.textContent = 'V\u00e9rifications KULANZ \u2014 ' + brand;

  var html = '';
  // Bandeau entretien : MASQUÉ par défaut, affiché uniquement pour Motopropulseur / Transmission
  html += '<div id="entretien-banner" class="info-box" style="display:none;background:var(--amber-soft);border:1px solid var(--amber-line);color:var(--amber);margin-bottom:14px;font-weight:600">'
    + '\u26a0\ufe0f Sous r\u00e9serve que l\'entretien soit \u00e0 jour.'
    + '<span style="font-weight:400"><br>Cat\u00e9gorie soumise \u00e0 l\'entretien : les pr\u00e9conisations constructeur, le dernier entretien et l\'absence de lien dommage/entretien sont des crit\u00e8res <strong>bloquants</strong> pour cette demande.</span>'
    + '</div>';
  questions.forEach(function(q, idx) {

    // ── TPI ──
    if (q.name === 'tpi') {
      html += '<div class="field" style="margin-bottom:12px">'
        + '<label>' + q.label + '</label>'
        + '<div class="radio-g" style="gap:16px;margin-top:6px">'
        + '<label class="r-item"><input type="radio" name="tpi" value="OUI" onchange="checkKulanzNok();toggleTpiField(true)"> Oui</label>'
        + '<label class="r-item"><input type="radio" name="tpi" value="NON" onchange="checkKulanzNok();toggleTpiField(false)"> Non</label>'
        + '</div>'
        + '</div>'
        + '<div id="tpi-num-field" class="field" style="display:none;margin-top:8px">'
        + '<label>Num\u00e9ro de TPI</label>'
        + '<input type="text" name="num_tpi" placeholder="TPI-2025-0042">'
        + '</div>'
        + '<div class="divider"></div>';
      return;
    }

    // ── vendu_client : conditionnel selon la question pr\u00e9c\u00e9dente ──
    if (q.name === 'vendu_client') {
      // Trouver la question pr\u00e9c\u00e9dente (dernier_entretien ou dernier_entretien_audi ou entretien_moment)
      var prevQ = questions[idx - 1];
      var prevName = prevQ ? prevQ.name : '';
      var triggerId = 'vendu-wrapper';
      html += '<div id="' + triggerId + '" style="display:none">'
        + '<div class="field">'
        + '<label>' + q.label + '</label>'
        + '<div class="radio-g" style="gap:16px;margin-top:6px">'
        + '<label class="r-item"><input type="radio" name="vendu_client" value="OUI" onchange="checkKulanzNok();hideVenduAlert()"> Oui</label>'
        + '<label class="r-item"><input type="radio" name="vendu_client" value="NON" onchange="checkKulanzNok();showVenduAlert()"> Non</label>'
        + '</div>'
        + '</div>'
        + '<div id="vendu-alert" style="display:none"></div>'
        + '</div>';
      return;
    }

    var divider = '';
    var nokOui = q.nok === 'OUI' ? ' <small style="color:var(--red)">\u2192 NOK</small>' : '';
    var nokNon = q.nok === 'NON' ? ' <small style="color:var(--red)">\u2192 NOK</small>' : '';

    // Questions dernier_entretien* : d\u00e9clenchent l'affichage de vendu_client si NON
    var isDernierEntretien = (q.name === 'dernier_entretien' || q.name === 'dernier_entretien_audi' || q.name === 'entretien_moment');
    var onchangeExtra = isDernierEntretien ? ';toggleVenduClient(this.value)' : '';
    var triggerNok = q.nok ? ' onchange="checkKulanzNok()' + onchangeExtra + '"' : (isDernierEntretien ? ' onchange="toggleVenduClient(this.value)"' : '');

    if (q.has_nc) {
      html += '<div class="field" style="margin-bottom:12px">'
        + '<label>' + q.label + '</label>'
        + '<div class="radio-g" style="gap:16px;margin-top:6px">'
        + '<label class="r-item"><input type="radio" name="' + q.name + '" value="OUI"' + triggerNok + '> Oui' + nokOui + '</label>'
        + '<label class="r-item"><input type="radio" name="' + q.name + '" value="NON"' + triggerNok + '> Non' + nokNon + '</label>'
        + '<label class="r-item"><input type="radio" name="' + q.name + '" value="NC" onchange="checkKulanzNok()"> Non concerné</label>'
        + '</div>'
        + '<div class="knok-item" id="knok-item-' + q.name + '" style="display:none;margin-top:8px"></div>'
        + '</div>'
        + divider;
    } else {
      html += '<div class="field" style="margin-bottom:12px">'
        + '<label>' + q.label + '</label>'
        + '<div class="radio-g" style="gap:16px;margin-top:6px">'
        + '<label class="r-item"><input type="radio" name="' + q.name + '" value="OUI"' + triggerNok + '> Oui' + nokOui + '</label>'
        + '<label class="r-item"><input type="radio" name="' + q.name + '" value="NON"' + triggerNok + '> Non' + nokNon + '</label>'
        + '</div>'
        + '<div class="knok-item" id="knok-item-' + q.name + '" style="display:none;margin-top:8px"></div>'
        + '</div>'
        + divider;
    }
  });

  zone.innerHTML = html;
  updateEntretienBanner();

  var alertZone = ge('kulanz-nok-alert');
  if (alertZone) { alertZone.classList.remove('show'); alertZone.innerHTML = ''; }
}




// ═══════════════════════════════════════════════════════════
// KULANZ NOK — alerte + règles par marque
// ═══════════════════════════════════════════════════════════

var BRAND_TEXTS = {
  audi: {
    title: 'Règles Audi',
    text: 'Le dernier entretien doit avoir été réalisé chez Audi. S\'il est dû au moment de la réclamation, il devra être réalisé chez Audi pour pouvoir bénéficier des participations commerciales du constructeur.'
  },
  vw: {
    title: 'Règles VW VP / VW Véhicules Utilitaires',
    text: 'Le dernier entretien doit avoir été réalisé selon les préconisations constructeur. S\'il est dû au moment de la réclamation, il devra être réalisé chez VW ou VW VUL pour bénéficier des participations commerciales.'
  },
  skoda: {
    title: 'Règles Skoda',
    text: 'Le dernier entretien doit avoir été réalisé selon les préconisations constructeur. Il est nécessaire de fournir l\'avant-dernier entretien pour vérifier le respect des échéances (max 30 000 km / max 24 mois). En cas d\'entretien "à faire" au moment de la réclamation, les deux entretiens précédents devront être fournis.<br><br><strong>Simplification Skoda (oct. 2024) :</strong> En cas d\'utilisation admise du CIG, le Kulanz devient possible dès lors qu\'il est combiné avec un CIG dans une même participation commerciale.'
  },
  seat: {
    title: 'Règles SEAT / CUPRA',
    text: 'Le dernier entretien doit avoir été réalisé selon les préconisations constructeur. S\'il est dû au moment de la réclamation, il devra être réalisé chez SEAT ou CUPRA pour bénéficier des participations commerciales du constructeur.'
  }
};

// Vrai si la catégorie sélectionnée est soumise au critère entretien (Motopropulseur / Transmission)
function isEntretienCategory() {
  var cat = ge('dom-cat') ? (ge('dom-cat').value || '') : '';
  cat = cat.toLowerCase();
  return cat.indexOf('motopropulseur') !== -1 || cat.indexOf('transmission') !== -1;
}

// Affiche le bandeau entretien uniquement pour Motopropulseur / Transmission
function updateEntretienBanner() {
  var banner = ge('entretien-banner');
  if (banner) banner.style.display = isEntretienCategory() ? 'block' : 'none';
}

function checkKulanzNok() {
  var zone = ge('kulanz-nok-alert');
  if (!zone) return;

  // Pop-up immédiat si OPTEVEN passe à OUI (une seule fois par changement)
  var optevenVal = gr('opteven');
  if (optevenVal === 'OUI' && G._lastOpteven !== 'OUI') {
    alert('🚫 Garantie OPTEVEN détectée\n\nUne garantie OPTEVEN est visible dans ELSA.\nLa prise en charge OPTEVEN prime : la KULANZ ne peut pas être appliquée.\n\n→ Orientez le dossier vers la garantie OPTEVEN.');
  }
  G._lastOpteven = optevenVal;

  var site   = ge('f-site') ? ge('f-site').value : '';
  var brand  = SITE_BRAND[site] || 'VW';
  var questions = KULANZ_BY_BRAND[brand] || KULANZ_BY_BRAND['VW'];

  // Les critères liés à l'entretien ne sont BLOQUANTS que pour Motopropulseur / Transmission
  var entretienNames = ['preconisations','dernier_entretien','dernier_entretien_audi','entretien_moment','lien_entretien'];
  var catEntretien = isEntretienCategory();

  // Collecter les réponses et détecter les NOK
  var reasons = [];
  questions.forEach(function(q) {
    if (!q.nok) return;
    // Si la question est liée à l'entretien et que la catégorie n'est pas Moto/Transmission, on ne bloque pas dessus
    if (entretienNames.indexOf(q.name) !== -1 && !catEntretien) return;
    var val = gr(q.name);
    if (q.nok && val === q.nok && val !== 'NC') {
      reasons.push(q.info || q.label);
    }
  });

  if (!reasons.length) {
    zone.classList.remove('show');
    zone.innerHTML = '';
    return;
  }

  // Règles par marque (textes popup)
  var brandKey = brand.toLowerCase();
  if (brandKey.indexOf('skoda') >= 0) brandKey = 'skoda';
  else if (brandKey.indexOf('audi') >= 0) brandKey = 'audi';
  else if (brandKey.indexOf('seat') >= 0) brandKey = 'seat';
  else brandKey = 'vw';

  var tuningVal = gr('tuning');
  var tuningNok = (tuningVal === 'OUI');

  var reasonsHtml = reasons.map(function(r) { return '<p>▪️ ' + esc(r) + '</p>'; }).join('');
  var brandHtml = '';
  if (BRAND_TEXTS && BRAND_TEXTS[brandKey]) {
    var b = BRAND_TEXTS[brandKey];
    brandHtml = '<div class="knok-brand">'
      + '<div class="knok-brand-title">' + b.title + '</div>'
      + '<div class="knok-brand-txt">' + b.text + '</div>'
      + '</div>';
  }

  var tuningBlock = '';
  if (tuningNok) {
    tuningBlock = '<div style="background:#fdf0f0;border:2px solid #c0392b;border-radius:8px;padding:12px 14px;margin-bottom:12px">'
      + '<div style="font-weight:700;color:#c0392b;font-size:13px;margin-bottom:6px">������Code tuning détecté — KULANZ IMPOSSIBLE</div>'
      + '<p style="margin:0 0 6px;font-size:12px">Un <strong>code tuning</strong> est présent dans SAGA. '
      + 'Le constructeur n’accorde aucune participation commerciale sur un véhicule avec code tuning actif.</p>'
      + '</div>';
  }

  // ── Alertes PAR ITEM : chaque critère écrit son message SOUS sa question ──
  [].forEach.call(document.querySelectorAll('.knok-item'), function(el){ el.style.display='none'; el.innerHTML=''; });

  var setItem = function(name, borderColor, titleColor, icon, title, body) {
    var el = ge('knok-item-' + name);
    if (!el) return;
    el.innerHTML = '<div style="background:#fdf0f0;border:2px solid '+borderColor+';border-radius:8px;padding:10px 12px">'
      + '<div style="font-weight:700;color:'+titleColor+';font-size:12.5px;margin-bottom:4px">'+icon+' '+title+'</div>'
      + '<p style="margin:0;font-size:12px">'+body+'</p></div>';
    el.style.display = 'block';
  };

  if (tuningNok) {
    setItem('tuning', '#c0392b', '#c0392b', '🚫', 'Code tuning détecté — KULANZ IMPOSSIBLE',
      'Un <strong>code tuning</strong> est présent dans SAGA. Le constructeur n’accorde aucune participation commerciale sur un véhicule avec code tuning actif.');
  }
  if (gr('opteven') === 'OUI') {
    setItem('opteven', '#c0392b', '#c0392b', '🚫', 'Garantie OPTEVEN détectée — KULANZ IMPOSSIBLE',
      'Une <strong>garantie OPTEVEN</strong> est visible dans ELSA. La prise en charge OPTEVEN prime : la <strong>KULANZ ne peut pas être appliquée</strong>. Orientez le dossier vers la garantie OPTEVEN.');
  }
  if (gr('piece_usure') === 'OUI') {
    setItem('piece_usure', '#f39c12', '#d68910', '⚠️', 'Pièce d’usure — Non couverte',
      'Les <strong>pièces d’usure</strong> (filtres, plaquettes, balais, ampoules…) sont exclues des participations constructeur. Elles relèvent de l’entretien normal du véhicule.');
  }
  ['preconisations','dernier_entretien','dernier_entretien_audi'].forEach(function(nm){
    if (gr(nm) === 'NON' && (entretienNames.indexOf(nm) === -1 || catEntretien)) {
      setItem(nm, '#e67e22', '#ca6f1e', '📋', 'Entretien incomplet ou non conforme',
        'Le contrôle de tous les entretiens selon les préconisations constructeur est requis. Une participation reste possible si <strong>aucun lien de causalité</strong> n’existe entre la réclamation et le service manquant. Si un entretien est « à faire », la participation ne peut être proposée qu’après réalisation.');
    }
  });
  if (gr('lien_entretien') === 'OUI' && catEntretien) {
    setItem('lien_entretien', '#e67e22', '#ca6f1e', '🔗', 'Lien dommage / entretien détecté',
      'Un lien de causalité établi entre le dommage et l’entretien rend la demande Kulanz <strong>irrecevable</strong>. Le dommage aurait pu être prévenu par un entretien conforme.');
  }

  // Bloc de synthèse en bas : récap motifs + règle marque
  zone.innerHTML = '<div class="knok-box">'
    + '<div class="knok-title">⚠ Kulanz non applicable — voir les alertes ci-dessus</div>'
    + '<div class="knok-body">'
    + '<strong style="font-size:11px;color:#c0392b">Motif(s) de non-éligibilité :</strong>'
    + '<div style="margin-top:6px">' + reasonsHtml + '</div>'
    + brandHtml
    + '</div></div>';

  zone.classList.add('show');
}

// ═══════════════════════════════════════════════════════
// AUTO-HIDE HEADER au scroll
// ═══════════════════════════════════════════════════════
(function() {
  var lastY    = 0;
  var header   = null;
  var ticking  = false;
  var THRESHOLD = 60; // pixels à scroller avant de cacher

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        header = header || document.querySelector('header');
        if (!header) { ticking = false; return; }
        var y = window.pageYOffset || document.documentElement.scrollTop;
        if (y > THRESHOLD) {
          // Dès qu'on a scrollé plus de THRESHOLD px → cacher
          header.classList.add('header-hidden');
        } else {
          // Seulement au top → montrer
          header.classList.remove('header-hidden');
        }
        lastY = y <= 0 ? 0 : y;
        ticking = false;
      });
      ticking = true;
    }
  }

  // Activer seulement sur la page formulaire (pas login)
  function initScrollHide() {
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Cliquer sur le bas du header caché le fait réapparaître
  document.addEventListener('click', function(e) {
    var h = document.querySelector('header');
    if (h && h.classList.contains('header-hidden')) {
      h.classList.remove('header-hidden');
    }
  });

  // Lancer après le login
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initScrollHide();
      initFirebase(); // Firebase initialisé dès le chargement
    });
  } else {
    initScrollHide();
    initFirebase(); // Firebase initialisé dès le chargement
  }
})();

// ═══════════════════════════════════════════════════════════
// Avertissement avant fermeture si une demande non envoyée est en cours
// ═══════════════════════════════════════════════════════════
window.addEventListener('beforeunload', function(e) {
  // Seulement si connecté, formulaire modifié, et au moins un champ clé rempli
  if (!G.role || !G._dirty) return;
  var rempli = (typeof gv === 'function') &&
    (gv('chassis') || gv('or_number') || gv('plainte_client'));
  if (!rempli) return;
  e.preventDefault();
  e.returnValue = ''; // message standardisé par le navigateur
  return '';
});

// ═══════════════════════════════════════════════════════════
// ENQUÊTE DE SATISFACTION (écran de confirmation)
// ═══════════════════════════════════════════════════════════
var G_survey = { facilite: 0, rapidite: 0, global: 0 };

// Sélection des étoiles (délégation)
document.addEventListener('click', function(e) {
  var star = e.target.closest ? e.target.closest('.stars span') : null;
  if (!star) return;
  var wrap = star.parentNode;
  var q = wrap.getAttribute('data-q');
  var v = parseInt(star.getAttribute('data-v'), 10);
  if (!q || !v) return;
  G_survey[q] = v;
  // colorer les étoiles jusqu'à v
  [].forEach.call(wrap.querySelectorAll('span'), function(s) {
    var sv = parseInt(s.getAttribute('data-v'), 10);
    s.textContent = sv <= v ? '★' : '☆';
    s.classList.toggle('on', sv <= v);
  });
});

function envoyerEnquete() {
  // Récupérer les sujets cochés
  var topics = [];
  [].forEach.call(document.querySelectorAll('#survey-topics input:checked'), function(c) { topics.push(c.value); });

  // Au moins une note ou un sujet
  if (!G_survey.facilite && !G_survey.rapidite && !G_survey.global && !topics.length) {
    toast('Merci de donner au moins une note.');
    return;
  }

  var rec = {
    id: Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    date: new Date().toLocaleDateString('fr-FR'),
    heure: new Date().toLocaleTimeString('fr-FR'),
    site: (ge('f-site') ? ge('f-site').value : '') || '',
    role: G.role || '',
    facilite: G_survey.facilite || null,
    rapidite: G_survey.rapidite || null,
    global: G_survey.global || null,
    ameliorations: topics
  };

  var key = 's' + String(rec.id).replace(/[^a-zA-Z0-9]/g, '');
  var save;
  try {
    if (typeof db !== 'undefined' && db) {
      save = db.ref('enquetes').child(key).set(rec);
    } else {
      save = Promise.resolve();
    }
  } catch (e) { save = Promise.resolve(); }

  Promise.resolve(save).then(function() {
    var block = ge('survey-block');
    if (block) {
      // masquer le formulaire, afficher le remerciement
      [].forEach.call(block.querySelectorAll('.survey-q, .btn-survey'), function(el) { el.style.display = 'none'; });
      var t = ge('survey-thanks'); if (t) t.style.display = 'block';
    }
  }).catch(function(err) {
    console.warn('Enquête:', err);
    toast('❌ Impossible d\'enregistrer l\'avis.');
  });
}

// Réinitialiser l'enquête pour la prochaine demande
function resetEnquete() {
  G_survey = { facilite: 0, rapidite: 0, global: 0 };
  [].forEach.call(document.querySelectorAll('#survey-block .stars span'), function(s) { s.textContent = '☆'; s.classList.remove('on'); });
  [].forEach.call(document.querySelectorAll('#survey-topics input:checked'), function(c) { c.checked = false; });
  var block = ge('survey-block');
  if (block) [].forEach.call(block.querySelectorAll('.survey-q, .btn-survey'), function(el) { el.style.display = ''; });
  var t = ge('survey-thanks'); if (t) t.style.display = 'none';
}

// ═══════════════════════════════════════════════════════════
// Notification "Documentation requise" côté usager
// ═══════════════════════════════════════════════════════════
function checkDocRequise() {
  var banner = ge('doc-required-banner');
  if (!banner) return;
  if (G.role !== 'usager') { banner.style.display = 'none'; return; }
  // demandes CCR de l'usager (son site) en attente de documentation
  var mySite = G.site || '';
  var docs = (G.demandes || []).filter(function(d) {
    return d.type === 'CCR' && d.statut === 'Demande envoyée' && (!mySite || d.site === mySite);
  });
  if (!docs.length) { banner.style.display = 'none'; return; }
  var liste = docs.map(function(d) {
    return '<li style="margin:4px 0;display:flex;align-items:center;gap:8px;flex-wrap:wrap">OR <strong>' + esc(d.or || '—') + '</strong> — châssis ' + esc(d.chassis || '—')
      + ' <button onclick="envoyerDocsPourDemande(\'' + esc(String(d.id)) + '\')" style="padding:3px 9px;background:#2C5AA0;color:#fff;border:none;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer">📧 Envoyer les documents</button></li>';
  }).join('');
  banner.innerHTML = '📄 <strong>Documentation à envoyer</strong> — '
    + docs.length + ' demande' + (docs.length > 1 ? 's' : '') + ' CCR en attente de vos documents :'
    + '<ul style="margin:6px 0 0;padding-left:20px;list-style:none">' + liste + '</ul>'
    + '<div style="margin-top:6px;font-size:12px">Cliquez sur « Envoyer les documents » : un e-mail s\'ouvre pré-rempli, joignez vos fichiers puis envoyez.</div>';
  banner.style.display = 'block';
}

// ═══════════════════════════════════════════════════════════
// Envoi des documents CCR par e-mail (mailto pré-rempli, sans stockage)
// ═══════════════════════════════════════════════════════════
function envoyerDocumentsCCR() {
  var d = G._lastCCR || {};
  envoyerDocsMailto(d, true);
}

// Envoi documents pour une demande précise (depuis le bandeau usager)
function envoyerDocsPourDemande(id) {
  var dem = G.demandes.find(function(x) { return x.id == id; });
  if (!dem) { toast('Demande introuvable.'); return; }
  envoyerDocsMailto({ site: dem.site, or: dem.or, chassis: dem.chassis, email: dem.email_usager }, false);
}

// Construit et ouvre le mailto de documents (avec ou sans checklist)
function envoyerDocsMailto(d, useChecklist) {
  d = d || {};
  var coches = [];
  if (useChecklist) {
    [].forEach.call(document.querySelectorAll('#ccr-doc-list .ccr-doc'), function(lbl) {
      var cb = lbl.querySelector('input');
      if (cb && cb.checked) coches.push('  - ' + lbl.textContent.trim());
    });
  } else {
    coches = ['  - Copie de l\'ordre de réparation (OR)', '  - Devis / facture au taux garantie',
      '  - Photos de la pièce / du dommage', '  - Historique d\'entretien', '  - Feuille commentaire technicien', '  - IQ généré'];
  }
  var sujet = 'Documents CCR - OR ' + (d.or || '') + ' - ' + (d.site || '');
  var corps = 'Bonjour,\n\n'
    + 'Veuillez trouver ci-joint les documents relatifs à la demande CCR suivante :\n\n'
    + '  Site    : ' + (d.site || '—') + '\n'
    + '  N° OR   : ' + (d.or || '—') + '\n'
    + '  Châssis : ' + (d.chassis || '—') + '\n\n'
    + 'Documents joints :\n' + (coches.length ? coches.join('\n') : '  (à joindre)')
    + '\n\n⚠ Pensez à joindre les fichiers à cet e-mail avant de l\'envoyer.\n\nCordialement.';
  var mailto = 'mailto:teamgarantie@geauto.fr'
    + '?subject=' + encodeURIComponent(sujet)
    + '&body=' + encodeURIComponent(corps.substring(0, 1800));
  ouvrirMailto(mailto);
  toast('📧 E-mail préparé — joignez vos documents puis envoyez.');
}


// ═══════════════════════════════════════════════════════════
// DÉBLOCAGE D'UN UTILISATEUR (TeamGarantie)
// Envoie un lien de réinitialisation à un collègue bloqué,
// sans console Firebase et sans droits administrateur.
// ═══════════════════════════════════════════════════════════
function ouvrirDeblocage() {
  if (G.role !== 'team') { toast('Réservé à la TeamGarantie.'); return; }
  var m = ge('debloc-modal'); if (!m) return;
  var inp = ge('debloc-email'); if (inp) inp.value = '';
  var err = ge('debloc-err'); if (err) { err.style.display = 'none'; err.textContent = ''; }
  var ok = ge('debloc-ok'); if (ok) { ok.style.display = 'none'; ok.textContent = ''; }
  m.classList.add('open');
  if (inp) setTimeout(function(){ inp.focus(); }, 100);
}

function fermerDeblocage() {
  var m = ge('debloc-modal'); if (m) m.classList.remove('open');
}

function envoyerLienDeblocage() {
  var inp = ge('debloc-email');
  var err = ge('debloc-err');
  var ok  = ge('debloc-ok');
  var showErr = function(msg) { if (err) { err.textContent = msg; err.style.display = 'block'; } if (ok) ok.style.display = 'none'; };

  var email = inp ? inp.value.trim() : '';
  if (!email) { showErr('Saisissez l\'e-mail du compte bloqué.'); return; }
  if (!email.toLowerCase().endsWith('@geauto.fr')) { showErr('L\'adresse doit être en @geauto.fr.'); return; }
  if (typeof firebase === 'undefined' || !firebase.auth) { showErr('Service indisponible. Réessayez plus tard.'); return; }

  if (err) err.style.display = 'none';

  firebase.auth().sendPasswordResetEmail(email)
    .then(function() {
      if (ok) {
        ok.innerHTML = '✅ Lien envoyé à <strong>' + esc(email) + '</strong>.<br>'
          + 'Prévenez ce collègue : il doit ouvrir l\'e-mail « Réinitialisation » et suivre le lien (valable 1 heure).';
        ok.style.display = 'block';
      }
      if (inp) inp.value = '';
      toast('📧 Lien de réinitialisation envoyé.');
    })
    .catch(function(e) {
      var msg = 'Envoi impossible.';
      if (e && e.code === 'auth/user-not-found') msg = 'Aucun compte avec cet e-mail. Vérifiez l\'orthographe.';
      else if (e && e.code === 'auth/invalid-email') msg = 'Adresse e-mail invalide.';
      else if (e && e.code === 'auth/too-many-requests') msg = 'Trop de tentatives. Patientez quelques minutes.';
      else if (e && e.code === 'auth/network-request-failed') msg = 'Problème de réseau. Vérifiez la connexion.';
      console.warn('Déblocage:', e);
      showErr(msg);
    });
}
