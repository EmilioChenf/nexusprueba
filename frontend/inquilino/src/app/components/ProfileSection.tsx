import { User, Building2, MapPin } from "lucide-react";

interface ProfileSectionProps {
  name: string;
  unit: string;
  building: string;
  role: string;
}

export function ProfileSection({ name, unit, building, role }: ProfileSectionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-start gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
          <User className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl mb-1">{name}</h1>
          <div className="inline-block bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-3">
            {role}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 opacity-80" />
              <span>{building}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 opacity-80" />
              <span>Unidad {unit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
