import React, { useState } from 'react';
import { 
  MapPin, 
  Building, 
  Phone, 
  ExternalLink, 
  Navigation, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Info 
} from 'lucide-react';
import { LOCAL_METRO_HUBS } from '../data/legalData';
import { AdSenseUnit } from '../components/AdSenseUnit';
import { SchemaMarkup } from '../components/SchemaMarkup';

export const LocalHubView: React.FC = () => {
  const [selectedHubId, setSelectedHubId] = useState(LOCAL_METRO_HUBS[0].id);

  const currentHub = LOCAL_METRO_HUBS.find(h => h.id === selectedHubId) || LOCAL_METRO_HUBS[0];

  return (
    <div className="space-y-8">
      {/* Schema.org with LocalBusiness / ProfessionalService node */}
      <SchemaMarkup
        pageType="LocalHub"
        title={`${currentHub.city} Small Business Permits & Municipal Compliance Hub`}
        description={`Official directory of ${currentHub.city} business licenses, city hall addresses, and county clerk filings.`}
        localBusinessData={{
          name: `${currentHub.city} Municipal Business Center`,
          city: currentHub.city,
          state: currentHub.stateCode,
          phone: currentHub.localCityHall.phone,
          address: currentHub.localCityHall.address,
        }}
      />

      {/* Top Banner Ad */}
      <AdSenseUnit format="leaderboard" slotId="local-top-leaderboard" />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
          <MapPin className="w-3.5 h-3.5" />
          <span>Local SEO & Google Maps Architecture • City-Level Permitting</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl text-slate-100">
          Local Municipal Compliance & Permit Hubs
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          State registration does not exempt you from municipal business taxes. Select your metro area below to view physical licensing offices, county clerk locations, and required local permits.
        </p>
      </div>

      {/* Metro Hub Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {LOCAL_METRO_HUBS.map((hub) => (
          <button
            key={hub.id}
            onClick={() => setSelectedHubId(hub.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedHubId === hub.id
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-slate-100 border border-slate-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>{hub.city}, {hub.stateCode}</span>
          </button>
        ))}
      </div>

      {/* City Overview Hero */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono text-amber-400 uppercase font-bold tracking-wider">
              Metro Region Profile
            </span>
            <h2 className="font-display font-bold text-2xl text-slate-100 mt-1">
              {currentHub.city} Municipal Business Hub
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span>Population: <strong className="text-slate-200">{currentHub.population}</strong></span>
            <span>•</span>
            <span>Strictness: <strong className="text-amber-400">{currentHub.regulationsLevel}</strong></span>
          </div>
        </div>

        {/* 3-Column NAP & Office Directory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* City Hall */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
              <Building className="w-4 h-4" />
              <span>Primary Licensing Office</span>
            </div>
            <h3 className="font-bold text-slate-200 text-sm">{currentHub.localCityHall.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{currentHub.localCityHall.address}</p>
            <div className="pt-2 border-t border-slate-900 text-xs font-mono text-amber-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>{currentHub.localCityHall.phone}</span>
            </div>
          </div>

          {/* County Clerk */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase">
              <Navigation className="w-4 h-4" />
              <span>County Clerk / DBA Office</span>
            </div>
            <h3 className="font-bold text-slate-200 text-sm">{currentHub.countyClerk.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{currentHub.countyClerk.address}</p>
            <div className="pt-2 border-t border-slate-900 text-xs font-mono text-cyan-400">
              {currentHub.countyClerk.purpose}
            </div>
          </div>

          {/* SBDC Office */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Free SBDC Advisory</span>
            </div>
            <h3 className="font-bold text-slate-200 text-sm">{currentHub.sbdcOffice.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{currentHub.sbdcOffice.address}</p>
            <div className="pt-2 border-t border-slate-900 text-xs font-mono text-emerald-400">
              {currentHub.sbdcOffice.service}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Representation */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Interactive Municipal Navigation & Geo-Coordinates</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Lat: {currentHub.localCityHall.lat.toFixed(4)}, Lng: {currentHub.localCityHall.lng.toFixed(4)}
          </span>
        </div>

        {/* Stylized Vector Radar Map */}
        <div className="w-full h-56 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          
          <div className="relative z-10 text-center space-y-2 p-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 mx-auto animate-pulse">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="font-bold text-slate-100 text-sm">
              {currentHub.localCityHall.name} ({currentHub.city}, {currentHub.stateCode})
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {currentHub.localCityHall.address}
            </p>
            <div className="pt-1">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentHub.localCityHall.address)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Required Municipal Permits Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>Mandatory Municipal Licenses in {currentHub.city}</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3">Permit / License Name</th>
                <th className="p-3">Issuing Agency</th>
                <th className="p-3">Renewal Frequency</th>
                <th className="p-3">Statutory Fee</th>
                <th className="p-3">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {currentHub.requiredPermits.map((permit, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-3 font-bold text-slate-200">{permit.name}</td>
                  <td className="p-3 text-slate-300">{permit.issuingAgency}</td>
                  <td className="p-3 text-amber-300 font-mono">{permit.frequency}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{permit.avgCost}</td>
                  <td className="p-3 text-slate-400">{permit.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IN-CONTENT NATIVE AD */}
      <AdSenseUnit format="in-content" slotId="local-bottom-native" />
    </div>
  );
};
