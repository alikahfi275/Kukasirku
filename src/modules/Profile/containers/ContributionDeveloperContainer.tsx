import React from 'react';
import ContributionDeveloperComponent from '../components/ContributionDevelopersComponent';

const ContributionDeveloperContainer: React.FC = () => {
  const policyTerms = [
    {
      id: 1,
      deskripsi: 'Aplikasi ini adalah aplikasi offline tanpa internet',
    },
    {
      id: 2,
      deskripsi: 'Jika aplikasi ini di uninstall maka semua data akan terhapus',
    },
    {
      id: 3,
      deskripsi:
        'Pastikan untuk mengizinkan semua izin yang dibutuhkan demi kelancaran fitur aplikasi',
    },
    {
      id: 4,
      deskripsi: 'Dilarang menjual kembali aplikasi ini',
    },
    {
      id: 5,
      deskripsi:
        'Pengembang tidak bertanggung jawab atas kesalahan penggunaan aplikasi ini',
    },
    {
      id: 6,
      deskripsi: 'Pengembang tidak bertanggung jawab atas kesalahan bisnis',
    },
    {
      id: 7,
      deskripsi: 'Aplikasi ini tidak ada iklan',
    },
    {
      id: 8,
      deskripsi: 'Aplikasi ini tidak ada langganan',
    },
    {
      id: 9,
      deskripsi:
        'Hak pengembang untuk menghentikan akses aplikasi jika pengguna melanggar ketentuan',
    },
  ];
  return <ContributionDeveloperComponent policyTerms={policyTerms} />;
};

export default ContributionDeveloperContainer;
