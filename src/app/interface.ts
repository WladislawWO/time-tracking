export interface FbResponce {
  data: Goals;
}

export interface Goals {
  english: number;
  programming: number;
  reading: number;
  date: string;
  dailyChallenges: DailyChallenges;
}

export interface DailyChallenges {
  math: boolean;
  rubiksCube: boolean;
  breathing: boolean;
  meditation: boolean;
}
