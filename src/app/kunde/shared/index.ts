// Todo Find out why you have to move exports to fix a "module has no exports" error.

export { FindError, SaveError, UpdateError, RemoveError } from './errors';
export {
    type Kunde,
    type KundeShared,
    type GeschlechtType,
    type Familienstand,
    type InteresseType,
    type Umsatz,
} from './kunde';
export {
    KundeReadService,
    type KundenServer,
    type Suchkriterien,
} from './kundeRead.service';
