import type { Component } from 'vue'
import NoComponent from "@/components/NoComponent.vue";
import Hero from "@/components/Hero.vue";
import ScheduleOverview from "@/components/ScheduleOverview.vue"
import Text from "@/components/Text.vue"
import TextMedia from "@/components/TextMedia.vue"
import ImageGallary from "@/components/ImageGallary.vue"
import Banner from "@/components/Banner.vue"
import List from "@/components/List.vue"
import Sponsor from "@/components/Sponsor.vue"
import NewsArticle from "@/components/NewsArticle.vue"
import Speaker from "@/components/Speaker.vue"
import Session from "@/components/Session.vue"
import Image from "@/components/Image.vue"
import SupporterList from "@/components/SupporterList.vue"
import SessionForm from "@/components/SessionForm.vue"
import Callout from "@/components/Callout.vue"
import Newsletter from "@/components/Newsletter.vue"
import Head from "@/components/PersonHead.vue"

type Mapping = {
  [name: string]: Component
}

export const mapping: Mapping = {
  Hero,
  ScheduleOverview,
  Text,
  TextMedia,
  ImageGallary,
  Banner,
  List,
  Sponsor,
  NewsArticle,
  Speaker,
  Session,
  Image,
  SupporterList,
  SessionForm,
  Callout,
  Newsletter,
  Head
};

export function getComponentForName(name: string) {
  return mapping[name] ?? NoComponent
}