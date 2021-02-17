import { CompanyProfileType } from '../redux/types/types.companies';

type Profile = CompanyProfileType | undefined;
interface UserProfile {
	isSocio(profile: Profile): boolean;
	isAdmin(profile: Profile): boolean;
	isColaborador(profile: Profile): boolean;
	isNotSocio(profile: Profile): boolean;
	isNotAdmin(profile: Profile): boolean;
	isNotColaborador(profile: Profile): boolean;
}
export const userProfile: UserProfile = {
	isSocio: (profile) => profile === CompanyProfileType.socio,
	isAdmin: (profile) => profile === CompanyProfileType.admin,
	isColaborador: (profile) => profile === CompanyProfileType.colaborador,
	isNotSocio: (profile) => profile !== CompanyProfileType.socio,
	isNotAdmin: (profile) => profile !== CompanyProfileType.admin,
	isNotColaborador: (profile) => profile !== CompanyProfileType.colaborador,
};
