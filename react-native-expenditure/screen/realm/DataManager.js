// https://stackoverflow.com/questions/44719103/singleton-object-in-react-native

import Realm from "realm";
import { ExpenditureRealm } from "./schema/ExpenditureRealm";
import { SalaryRealm } from "./schema/SalaryRealm";
import app from "./RealmApp";
import Schema from "./schema/Schemas";

export default class DataManager {

    static dataManagerInstance = null;
    realmInstance = null;
    /**
     * @returns {DataManager}
     */
    static getInstance() {
        if (DataManager.dataManagerInstance == null) {
            DataManager.dataManagerInstance = new DataManager();
        }
        return this.dataManagerInstance;
    }

    getRealmManager() {
        return this.realmInstance;
    }

    async initRealmManager() {
        try {
            const OpenRealmBehaviorConfiguration = {
                type: 'openImmediately',
            };
            const config = {
                schema: [SalaryRealm.schema, ExpenditureRealm.schema],
                sync: {
                    user: app.currentUser,
                    flexible: true,
                    newRealmFileBehavior: OpenRealmBehaviorConfiguration,
                    existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
                },
            };
            // open a realm for this particular project
            Realm.open(config).then((realm) => {
                subscribingRealm(realm)
                this.realmInstance = realm
            });

        } catch (error) {
            // cuelog("LanguageRealm error=====>", error)
        }
    }
}

const clearSubscribingRealm = async () => {
    const datamanager = DataManager.getInstance();
    // datamanager.realmInstance
    console.log('Subscribing to Clear');
    if (datamanager.realmInstance) {
        datamanager.realmInstance.close();
        datamanager.realmInstance.current = null;
    }
}

const subscribingRealm = async (realm) => {
    console.log('Subscribing to Realm path '+ realm.path);
    const salaryRealm = realm.objects(Schema.Salary);
    const expenditureRealm = realm.objects(Schema.Expenditure);
    await realm.subscriptions.update(mutableSubs => {
        mutableSubs.add(salaryRealm);
        mutableSubs.add(expenditureRealm);
        console.log('Added Subscribing to Realm');
    });
}
