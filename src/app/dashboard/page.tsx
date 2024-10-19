"use client";
import styles from './page.module.css'

import React from 'react'

import { useGetPokemonByNameQuery } from '@/redux/api'

export default function Dashboard() {

    const { data, error, isLoading } = useGetPokemonByNameQuery(" ");

    console.log(data)
  return (
    <div>Dashboard</div>
  )
}
