import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactNode,
} from "react";

// Common Types--------------------------------------------------

export interface HeadCell {
  id: string | number | undefined;
  label: string;
  numeric?: boolean;
  colSpan?: number;
  enableSorting?: boolean;
  sortKey?: string;
}
export interface AdditionalHeadCell {
  id: string | number | undefined;
  label: string;
  numeric?: boolean;
  colSpan?: number;
}

export interface CommonInputProps {
  id?: string;
  name?: string;
  value?: any;
  label?: string;
  subLabel?: string;
  optional?: boolean;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  placeholder?: string;
  autoFocus?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?:
    | ChangeEventHandler<HTMLInputElement>
    | ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  onKeydown?: KeyboardEventHandler;
}

export interface tableLink {
  href: string;
  children: ReactNode;
}

export interface DataTableProps {
  headCells: HeadCell[];
  additionalHeadCells?: AdditionalHeadCell[];
  rows: TableRow[];
  render: (row: TableRow) => React.ReactNode;
  action?: boolean;
  loading?: boolean;
  handleChange?: (pageNo: number) => void;
  paginationEnabled?: boolean;
  count?: number;
  limit?: number;
  setSortBy?: (sortBy: string) => void;
  sortBy?: string;
  currentPage?: number;
  tableFooterTitle?: string;
  onClickRow?: (rowId: any) => void;
  enableSelection?: boolean;
  selectionHeaderComponent?: React.ReactNode;
  setSelectedRowsId?: any;
  selectedRowsId?: number[];
  additionalHeadCellsRowClassName?: string;
  headCellsRowClassName?: string;
  rowClassName?: string;
  showSelectAllCheckbox?: boolean;
  tableWrapperStyle?: CSSProperties;
  // setShowDataCount: (limit: number) => void;
}

export interface TableRow {
  [key: string]: string | number | boolean;
  id: number;
}
// --------------------------------------------------------

export type permissionsObjectType = {
  create: boolean;
  update: boolean;
  retrieve: boolean;
  delete: boolean;
  action: boolean;
};

export type permissionsType = {
  user: permissionsObjectType;
  configuration: permissionsObjectType;
  partner: permissionsObjectType;
  area: permissionsObjectType;
  asset: permissionsObjectType;
  report: permissionsObjectType;
  dashboard: permissionsObjectType;
  unit: permissionsObjectType;
  license: permissionsObjectType;
};

export type profileDetailResponseType = {
  id: number;
  email: string;
  username: string;
  fullname: string;
  phone: number;
  role: "super-admin" | "admin";
  is_active: boolean;
  last_active_on: string;
  permissions: permissionsType;
};

export type CommonUserResponseType = {
  id: number;
  fullname: string;
  username: string;
  photo: string;
  role: string;
};

interface CommonType {
  created_by: CommonUserResponseType;
  created_on: string;
  modified_by: CommonUserResponseType;
  modified_on: null;
  deleted_by: CommonUserResponseType;
  deleted_on: null;
  is_active: boolean;
  is_deleted: boolean;
}

interface countryResponseType extends CommonType {
  id: number;
  name: string;
  code: string;
  phone_number_code: string;
  vat_rate: number;
  currency: string;
}

interface RegionResponseType extends CommonType {
  id: number;
  country: countryResponseType;
  name: string;
  housing_fees: 0;
}

interface CityResponseType extends CommonType {
  id: number;
  region: RegionResponseType;
  name: string;
}

interface TypeResponseType extends CommonType {
  id: number;
  name: string;
  required_field: "percentage" | "icon";
}

interface ValueResponseType extends CommonType {
  id: number;
  name: string;
  icon: string;
  percentage: number | string;
  group: TypeResponseType;
}

interface LicenseResponseType extends CommonType {
  id: number | string;
  name: string;
  license_id: string;
  previous_name: string;
  description: string;
  launched_in: string;
  icon: string;
  location_map: string;
  video_link: string;
  is_live: boolean;
  is_featured: boolean;
  license_type: ValueResponseType[];
  country: countryResponseType;
  region: RegionResponseType;
}

interface AreaResponseType extends CommonType {
  id: 3;
  developer_or_owner: TypeResponseType;
  zoning_authority: TypeResponseType;
  transfer_fees: TypeResponseType;
  location_type: TypeResponseType;
  municipality_authority: null;
  status: TypeResponseType;
  license_id: LicenseResponseType[];
  function: TypeResponseType[];
  location_amenities: TypeResponseType[];
  location_name: string;
  location_id: string;
  other_names: string;
  previous_names: string;
  description: string;
  size: string;
  launched_in: number;
  municipality_no: string | number;
  is_designated: boolean;
  is_with_gcc_ownership: boolean;
  is_freehold: boolean;
  is_leasehold: boolean;
  hotel_name: string;
  hospital_name: string;
  assets_in_complex: number;
  office_assets_in_complex: number;
  residential_assets_in_complex: number;
  hospitality_assets_in_complex: number;
  icon: string;
  location_plan: string;
  video_link: string;
  show_on_area_search: boolean;
  show_on_asset_search: boolean;
  live: boolean;
  featured: boolean;
  country: countryResponseType;
  region: RegionResponseType;
  city: CityResponseType;
  townhouses_type: {
    id: number;
    items: number;
    area: number;
    townhouse_type: TypeResponseType;
  }[];
  villas_type: {
    id: number;
    items: number;
    area: number;
    villa_type: TypeResponseType;
  }[];
  pictures: {
    id: number;
    file: string;
    area: number;
  }[];
}

interface AssetsResponseType extends CommonType {
  id: number;
  asset_type: TypeResponseType;
  asset_sub_type: TypeResponseType;
  function: TypeResponseType[];
  unit_number: number | null;
  name: string;
  other_names: string;
  name_of_complex: TypeResponseType;
  developer_or_owner: TypeResponseType;
  description: string;
  height: number | null;
  floors_above_ground: number | null;
  floors_below_ground: number | null;
  status: TypeResponseType;
  sub_status: TypeResponseType;
  completion: number | null;
  expected_completion: number | null;
  license_id: LicenseResponseType[];
  country: countryResponseType;
  region: RegionResponseType;
  city: CityResponseType;
  address: string;
  makani_number: number | null;
  location: AreaResponseType[];
  financial: FinancialResponseType;
  asset_build_up_area: number | null;
  internal_built_up_area: number | null;
  external_built_up_area: number | null;
  mezzanine_built_up_area: number | null;
  land_size: number | null;
  land_type: TypeResponseType[];
  floor_area_ratio: number | null;
  is_vacant: boolean;
  is_leased_out: boolean;
  number_of_units: number | null;
  office_floors: number | null;
  office_built_up_area: number | null;
  number_of_offices: number | null;
  residential_floors: number | null;
  residential_built_up_area: number | null;
  number_of_residential_units: number | null;
  retail_floors: number | null;
  retail_built_up_area: number | null;
  number_of_retail_spaces: number | null;
  hospitality_floors: number | null;
  hospitality_built_up_area: number | null;
  number_of_hotel_rooms: number | null;
  hotel_apartments_floors: number | null;
  hotel_apartments_built_up_area: number | null;
  number_of_hotel_apartments: number | null;
  mechanical_floors: number | null;
  parking_floors: number | null;
  number_of_allocated_parkings: number | null;
  allocated_parkings: number | null;
  flooring_type: TypeResponseType[];
  fitout_id: TypeResponseType;
  asset_amenities: TypeResponseType[];
  asset_video_link: string;
  number_of_security_rooms: number | null;
  number_of_loading_ramps: number | null;
  number_of_loading_docks: number | null;
  number_of_rooms: number | null;
  number_of_garbage_rooms: number | null;
  number_of_first_aid_rooms: number | null;
  number_of_labour_service_rooms: number | null;
  number_of_service_blocks: number | null;
  number_of_supervisor_rooms: number | null;
  number_of_prayer_rooms: number | null;
  number_of_ablution_rooms: number | null;
  number_of_lifts: number | null;
  number_of_wet_pantries_or_kitchens: number | null;
  number_of_meeting_rooms: number | null;
  number_of_security_gates: number | null;
  number_of_electric_vehicle_chargers: number | null;
  number_of_toilets: number | null;
  number_of_bathrooms: number | null;
  number_of_washrooms: number | null;
  number_of_dry_pantries_or_kitchens: number | null;
  number_of_storage_rooms: number | null;
  number_of_telephone_rooms: number | null;
  number_of_dining_halls: number | null;
  number_of_laundry_rooms: number | null;
  allocated_car_parkings: number | null;
  allocated_bus_parkings: number | null;
  allocated_bicycle_parkings: number | null;
  allocated_bike_parkings: number | null;
  chilled_store_built_up_area: number | null;
  frozen_store_built_up_area: number | null;
  dry_store_built_up_area: number | null;
  power_allocated: number | null;
  capacity_pax: number | null;
  air_conditioning_system: TypeResponseType;
  air_conditioning_type: TypeResponseType[];
  overhead_crane_tonage: number | null;
  eaves_height: number | null;
  apex_height: number | null;
  icon: string;
  asset_plan: string;
  asset_location: string;
  asset_affection_plan: string;
  asset_payment_plan: string;
  awards: string;
  live: boolean;
  featured: boolean;
  showing_on_asset_search: boolean;
  trakheesi_Permit_number: number | null;
  price_on_demand: boolean;
  residential_units_type: {
    residential_unit: TypeResponseType;
    items: number;
    id: number;
  }[];
  hotel_apartments_units_type: {
    hotel_apartment_unit: TypeResponseType;
    items: number;
    id: number;
  }[];
  asset_picture: {
    id: number;
    attachment_type: string;
    image: string;
    asset: number;
  }[];
  certification: {
    id: number;
    certification: TypeResponseType;
    rating: TypeResponseType;
    asset: number;
  }[];
  total_service_charges_per_year: number;
  total_chilled_water_charges_per_year: number;
  total_utility_charges_per_year: number;
  total_rent_inclusive_of_vat: number;
  total_aksing_price_inclusive_of_vat: number;
  completed_in: number | null;
  hotel_name: string;
  maximum_office_built_up_area: number | null;
  minimum_office_built_up_area: number | null;
  asset_class: TypeResponseType;
  parking_ratio: number | null;
  asset_build_up_area_measurement_type: string;
  residential_built_up_area_measurement_type: string;
  office_built_up_area_measurement_type: string;
  minimum_office_built_up_area_measurement_type: string;
  mezzanine_built_up_area_measurement_type: string;
  maximum_office_built_up_area_measurement_type: string;
  land_size_measurement_type: string;
  internal_built_up_area_measurement_type: string;
  hotel_apartments_built_up_area_measurement_type: string;
  hospitality_built_up_area_measurement_type: string;
  frozen_store_built_up_area_measurement_type: string;
  external_built_up_area_measurement_type: string;
  dry_store_built_up_area_measurement_type: string;
  chilled_store_built_up_area_measurement_type: string;
  retail_built_up_area_measurement_type: string;
  common_build_up_area: string;
  common_build_up_area_measurement_type: string;
  property_number: string | number;
  municipality_number: string | number;
  plot_number: string | number;
}

interface PaymentTermsResponseType extends CommonType {
  id: number;
  name: string;
  content: string;
}

interface FinancialResponseType extends CommonType {
  id: number;
  sublease_tax_applicable: ValueResponseType;
  transaction_type: ValueResponseType[];
  rental_amount: number;
  renting_rate: number;
  rental_rent_subject_to_vat: boolean;
  current_income: number;
  current_income_in_percentage: number;
  average_renting_rate_in_last_12_months: number;
  rental_transaction_in_last_12_months: number;
  asking_rate: number;
  asking_price: number;
  asking_price_subject_to_vat: boolean;
  rental_security_deposit: number;
  turnover_rent: number;
  net_effective_rate: number;
  design_and_fitout_fee: number;
  yearly_marketing_fee: number;
  fitout_rent_free_period: number;
  average_buying_rate_in_last_12_months: number;
  buying_transactions_in_last_12_months: number;
  service_charges_included: boolean;
  service_charges: number;
  chilled_water_charges_included: boolean;
  chilled_water_charges: number;
  utility_charges_included: boolean;
  utility_charges: number;
  is_sublease_allowed: boolean;
  is_sublease_tax_applicable: boolean;
  is_sublease_tax_subjected_to_vat: boolean;
  is_designated: boolean;
  is_with_gcc_ownership: boolean;
  is_freehold: boolean;
  is_leasehold: boolean;
  land_lease_starting_year: number;
  land_lease_period: number;
  with_payment_plan: boolean;
  payment_terms: PaymentTermsResponseType;
  transfer_fees: ValueResponseType;
  security_deposit: number;
  sublease_tax_amount_per_year: number;
  remaining_land_lease_period: number;
  asking_rate_measurement_type: string;
}

export interface UnitResponseType extends CommonType {
  id: number;
  unit_type: TypeResponseType;
  unit_sub_type: TypeResponseType;
  asset: AssetsResponseType;
  unit_number: string;
  floor: string;
  floor_type: TypeResponseType;
  description: string;
  sub_status: TypeResponseType;
  located_on_level: number;
  open_since: number;
  managed_by: TypeResponseType;
  license_id: LicenseResponseType[];
  financial: FinancialResponseType;
  internal_built_up_area: string;
  external_built_up_area: string;
  mezzanine_built_up_area: string;
  internal_height: string;
  is_vacant: boolean;
  is_leased_out: boolean;
  flooring_type: TypeResponseType[];
  fitout_id: TypeResponseType;
  capacity_pax: number;
  unit_amenities: TypeResponseType[];
  number_of_wet_pantries: string;
  number_of_meeting_rooms: string;
  number_of_bathrooms: string;
  number_of_dry_pantries: string;
  number_of_storage_rooms: string;
  number_of_telephone_rooms: string;
  number_of_board_rooms: string;
  number_of_manager_rooms: string;
  number_of_prayer_rooms: string;
  power_allocated: string;
  air_conditioning_system: TypeResponseType;
  air_conditioning_type: TypeResponseType[];
  partition_type: TypeResponseType[];
  view_type: TypeResponseType[];
  icon: string;
  unit_plan: string;
  unit_location: string;
  unit_affection_plan: string;
  unit_payment_plan: string;
  awards: string;
  live: boolean;
  featured: boolean;
  trakheesi_Permit_number: string;
  price_on_demand: boolean;
  serviced_offices_type: {
    id: number;
    type_value_id: TypeResponseType;
    items: number;
    unit: number;
  }[];
  unit_picture: {
    id: number;
    attachment_type: string;
    image: string;
    asset: number;
  }[];
  total_service_charges_per_year: number;
  total_chilled_water_charges_per_year: number;
  total_utility_charges_per_year: number;
  total_rent_inclusive_of_vat: number;
  total_aksing_price_inclusive_of_vat: number;
  unit_built_up_area: number;
  service_offices_number: number;
  unit_video_link: string;
  number_of_allocated_parkings: string;
  unit_built_up_area_measurement_type: string;
  mezzanine_built_up_area_measurement_type: string;
  internal_built_up_area_measurement_type: string;
  external_built_up_area_measurement_type: string;
  common_built_up_area: string;
  common_built_up_area_measurement_type: string;
  property_number: string | number;
}

export interface InquiryResponseType extends CommonType {
  id: number;
  is_active: boolean;
  is_deleted: boolean;
  fullname: string;
  company: string;
  email: string;
  message: string;
  is_read: boolean;
  unit: number;
  user: {
    id: number;
    fullname: string;
    username: string;
    photo: null;
    role: string;
  };
}
