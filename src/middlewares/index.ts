import { DevInfoExists } from './developerInfosExists.middleware';
import { DevIdExists } from "./developerIdExists.middleware";
import { ProjectIdExists } from "./projectIdExists.middleware";
import { emailExist } from "./emailExists.middleware";
import { CatchErrors } from "./catchError.middleware";

export default { DevIdExists, ProjectIdExists, emailExist, CatchErrors, DevInfoExists}