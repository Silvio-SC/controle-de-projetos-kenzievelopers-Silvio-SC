import { QueryResult } from "pg"

interface Developer {
    id: number,
    name: string,
    email: string
}

type DeveloperResult = QueryResult<Developer>
type DeveloperCreate = Omit<Developer, "id">

interface DeveloperInfos {
    id: number, 
    developerSince: Date | string,
    preferredOS: "Windows" | "MacOS" | "Linux", 
    developerId: number
}

type DeveloperInfoResult = QueryResult<DeveloperInfos>
type DeveloperInfoCreate = Omit<DeveloperInfos, "id">


interface Project {
    id: number,
    name: string,
    description: string | null | undefined,
    repository: string,
    startDate: Date | string,
    endDate: Date | string | null,
    developerId: number | null
}

type ProjectResult = QueryResult<Project>

interface CreateProject {
    name: string,
    description: string | null | undefined,
    repository: string,
    startDate: Date | string,
    endDate?: Date | string,
    developerId?: number
}


export { Developer, DeveloperResult, DeveloperCreate,
    DeveloperInfos, DeveloperInfoResult, DeveloperInfoCreate, 
    Project, CreateProject, ProjectResult }